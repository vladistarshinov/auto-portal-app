import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ProductModule } from 'src/product/product.module'
import { ReviewController } from './review.controller'
import { ReviewService } from './review.service'
import { Review, ReviewSchema } from './schema/review.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
        { name: Review.name, schema: ReviewSchema }
    ]),
    ProductModule
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
