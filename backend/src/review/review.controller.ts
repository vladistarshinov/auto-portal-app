import {Body, Controller, Get, HttpCode, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Types } from 'mongoose';
import { IdValidationPipe } from 'pipes/id-validation.pipe';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { User } from 'src/user/decorators/user.decorator';
import { SetReviewDto } from './dto/set-review.dto';

import { ReviewService } from './review.service';

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

    @HttpCode(200)
    @Post()
    public async setReviewByProduct(@Body() dto: SetReviewDto) {
        return this.reviewService.create(dto);
    }
}
