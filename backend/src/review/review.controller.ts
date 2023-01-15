import {Body, Controller, Delete, Get, HttpCode, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { Types } from 'mongoose'
import { IdValidationPipe } from 'pipes/id-validation.pipe'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { User } from 'src/user/decorators/user.decorator'
import { SetReviewDto } from './dto/set-review.dto'

import { ReviewService } from './review.service'

@Controller('reviews')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    @Auth()
    @Get(':productId')
    public async getProductUserReview(
        @Param('productId', IdValidationPipe) productId: Types.ObjectId,
        @User('id') id: Types.ObjectId
    ) {
        return this.reviewService.getByUser(productId, id)
    }

    @Auth()
    @Get('by-product/:productId')
    public async getReviewsByProduct(
        @Param('productId', IdValidationPipe) productId: Types.ObjectId,
    ) {
        return this.reviewService.getByProduct(productId)
    }

    @Auth()
    @HttpCode(200)
    @Post()
    public async setReviewByProduct(@User('id') userId: Types.ObjectId, @Body() dto: SetReviewDto) {
        return this.reviewService.create(userId, dto)
    }

    @Auth()
    @HttpCode(200)
    @Delete(':reviewId')
    public async deleteReview(
        @User('id') userId: Types.ObjectId,
        @Param('reviewId', IdValidationPipe) reviewId: Types.ObjectId,
        @Body() { productId }: { productId: Types.ObjectId }
    ): Promise<void> {
        return this.reviewService.delete(userId, productId, reviewId)
    }

    @Auth('admin')
    @HttpCode(200)
    @Delete(':reviewId/admin')
    public async deleteReviewByAdmin(
        @Param('reviewId', IdValidationPipe) reviewId: Types.ObjectId,
        @Body() { productId }: { productId: Types.ObjectId }
    ): Promise<void> {
        return this.reviewService.deleteByAdmin(productId, reviewId)
    }
}
