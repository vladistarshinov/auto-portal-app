import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProductService } from 'src/product/product.service';
import { SetReviewDto } from './dto/set-review.dto';
import { Review, ReviewDocument } from './schema/review.schema';

@Injectable()
export class ReviewService {
    constructor(
        @InjectModel(Review.name)
        private readonly reviewModel: Model<ReviewDocument>,
        private readonly productModel: ProductService
    ) {}

    public async getByUser(productId: Types.ObjectId, userId: Types.ObjectId) {
        console.log(userId)
       const userRating = await this.reviewModel
            .findOne({product: productId, user: userId})
            .select('rating')
            .exec()
            .then((data) => (data ? data.rating : 0))

       const userDesc = await this.reviewModel
            .findOne({product: productId, user: userId})
            .select('description')
            .exec()
            .then((data) => (data ? data.description : null))

        return {
           rating: userRating,
           description: userDesc
        }
    }

    public async create(dto: SetReviewDto) {
        const { productId, userId, rating, description } = dto;

        const newRating = await this.reviewModel
            .findOneAndUpdate(
                { product: productId, user: userId },
                { product: productId, user: userId, rating, description },
                { new: true, upsert: true, setDefaultsOnInsert: true }
            )
            .exec();
        const averageRating = await this.averageRatingByProduct(productId, rating);
        await this.productModel.updateRating(productId, averageRating);

        return newRating;
    }


    private async averageRatingByProduct(productId: Types.ObjectId | string, newRating: number) {
        const ratingsProduct: Review[] = await this.reviewModel
            .aggregate()
            .match({
                product: productId
            })
            .exec();
        return (
            ratingsProduct.length > 0 ?
            ratingsProduct.reduce((acc, item) => acc + item.rating, 0) /
            ratingsProduct.length : newRating
        );
    }
}
