import {BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
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
        if (review) throw new BadRequestException('Харе тут спамить')
        const newRating = await this.reviewModel
            .findOneAndUpdate(
                { product: productId, user: userId },
                { product: productId, user: userId, rating, description },
                { new: true, upsert: true, setDefaultsOnInsert: true }
            )
            .exec()
        const averageRating = await this.averageRatingByProduct(productId, rating)
        await this.productModel.updateRating(productId, averageRating)

        return newRating
    }

    public async delete(userId: Types.ObjectId, productId: Types.ObjectId, reviewId: Types.ObjectId): Promise<void> {
        const review = await this.reviewModel.findOne({ _id: reviewId, user: userId })
        if (!userId) throw new BadRequestException('Пожалуйста, авторизуйтесь')
        if (!productId) throw new BadRequestException('Не понимаю, у какого продукта удалять коммент')
        if (!review) throw new NotFoundException('У вас нет возможности удалить комментарий')
        else {
            await this.reviewModel.findByIdAndDelete(reviewId).exec()
            const averageRating = await this.averageRatingByProduct(productId)
            await this.productModel.updateRating(productId, averageRating)
        }
    }

    public async deleteByAdmin( productId: Types.ObjectId, reviewId: Types.ObjectId) {
        if (!productId) throw new BadRequestException('Не понимаю, у какого продукта удалять коммент')
        await this.reviewModel.findByIdAndDelete(reviewId).exec()
        const averageRating = await this.averageRatingByProduct(productId)
        await this.productModel.updateRating(productId, averageRating)
    }


    private async averageRatingByProduct(productId: Types.ObjectId | string, newRating?: number) {
        const ratingsProduct: Review[] = await this.reviewModel
            .aggregate()
            .match({
                product: productId
            })
            .exec()
        return (
            ratingsProduct.length > 0 ?
            ratingsProduct.reduce((acc, item) => acc + item.rating, 0) /
            ratingsProduct.length : newRating
        );
    }
}
