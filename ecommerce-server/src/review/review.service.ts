import {BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { DtoConstants } from 'common/constants/dto.constants'
import { ReviewErrorConstants } from 'common/constants/error.constants'
import { Model, Types } from 'mongoose'
import { ProductService } from 'src/product/product.service'
import { SetReviewDto } from './dto/set-review.dto'
import { Review, ReviewDocument } from './schema/review.schema'

@Injectable()
export class ReviewService {
    constructor(
        @InjectModel(Review.name)
        private readonly reviewModel: Model<ReviewDocument>,
        private readonly productModel: ProductService
    ) {}

    public async getByUser(productId: Types.ObjectId, userId: Types.ObjectId) {
       const userRating = await this.getFieldValueByIds('rating', productId, userId)
       const userDesc = await this.getFieldValueByIds('description', productId, userId)

        return {
           rating: userRating,
           description: userDesc
        }
    }

    private async getFieldValueByIds(field: string, productId: Types.ObjectId, userId: Types.ObjectId) {
        return await this.reviewModel
            .findOne({product: productId, user: userId})
            .select(field)
            .exec()
            .then((data) => (data ? data?.[field] : null))
    }

    public async getByProduct(productId: Types.ObjectId) {
        return this.reviewModel.find({ product: productId }).exec()
    }

    public async create(userId: Types.ObjectId, dto: SetReviewDto) {
        const { productId, rating, description } = dto
        const review = await this.reviewModel.findOne({ product: productId, user: userId })
        if (review) throw new BadRequestException(ReviewErrorConstants.MORE_ONE)
        const newRating = await this.reviewModel
            .findOneAndUpdate(
                { product: productId, user: userId },
                { product: productId, user: userId, rating, description },
                { new: true, upsert: true, setDefaultsOnInsert: true }
            )
            .exec()
        const averageRating = await this.averageRatingByProduct(productId, rating)
        await this.productModel.updateRating(productId, averageRating, 'C', newRating._id)

        return newRating
    }

    public async delete(userId: Types.ObjectId, productId: Types.ObjectId, reviewId: Types.ObjectId): Promise<void> {
        const review = await this.reviewModel.findOne({ _id: reviewId, user: userId })
        if (!userId) throw new BadRequestException(ReviewErrorConstants.IS_AUTH)
        if (!productId) throw new BadRequestException(ReviewErrorConstants.PRODUCT_ID)
        if (!review) throw new NotFoundException(ReviewErrorConstants.DONT_REMOVE)
        else {
            await this.reviewModel.findByIdAndDelete(reviewId).exec()
            const averageRating = await this.averageRatingByProduct(productId)
            await this.productModel.updateRating(productId, averageRating, 'D', reviewId)
        }
    }

    public async deleteByAdmin( productId: Types.ObjectId, reviewId: Types.ObjectId): Promise<void> {
        if (!productId) throw new BadRequestException(ReviewErrorConstants.PRODUCT_ID)
        await this.reviewModel.findByIdAndDelete(reviewId).exec()
        const averageRating = await this.averageRatingByProduct(productId)
        await this.productModel.updateRating(productId, averageRating, 'D', reviewId)
    }


    private async averageRatingByProduct(productId: Types.ObjectId | string, newRating?: number) {
        const ratingsProduct: Review[] = await this.reviewModel
            .aggregate()
            .match({
                product: productId
            })
            .exec()
        return (
            ratingsProduct.length > 0
              ? ratingsProduct.reduce((acc, item) => acc + item.rating, 0) / ratingsProduct.length
              : newRating
        );
    }
}
