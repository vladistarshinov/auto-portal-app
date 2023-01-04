import { IsNumber, IsOptional, IsString } from 'class-validator'
import {IsObjectId} from 'class-validator-mongo-object-id'
import { Types } from 'mongoose'

export class SetReviewDto {
    @IsNumber()
    rating: number

    @IsOptional()
    @IsString()
    description?: string

    @IsObjectId({ message: 'Невалидный id товара' })
    productId: Types.ObjectId

    @IsObjectId({ message: 'Невалидный id товара' })
    userId: Types.ObjectId
}