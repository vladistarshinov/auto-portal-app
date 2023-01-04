import {IsNumber, IsOptional, IsString } from "class-validator"
import { Types } from "mongoose"

export class UpdateProductDto {
    @IsOptional()
    @IsString()
    title?: string

    @IsOptional()
    @IsString()
    description?: string

    @IsOptional()
    @IsString()
    imageUrl?: string

    @IsOptional()
    videoUrl?: string

    @IsOptional()
    @IsString()
    brand: string

    @IsOptional()
    @IsNumber()
    oldPrice?: number;

    @IsOptional()
    @IsNumber()
    price?: number

    @IsOptional()
    @IsNumber()
    countInStock?: number

    @IsOptional()
    @IsNumber()
    rating?: number

    @IsOptional()
    @IsString()
    categoryId?: Types.ObjectId;
}