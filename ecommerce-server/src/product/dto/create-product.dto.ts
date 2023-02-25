import {IsBoolean, IsNumber, IsOptional, IsString } from "class-validator"
import { Types } from "mongoose"

export class CreateProductDto {
    @IsString()
    title: string

    @IsString()
    description: string

    @IsString()
    slug: string

    @IsString()
    imageUrl: string

    videoUrl?: string

    @IsString()
    brand: string

    @IsOptional()
    @IsNumber()
    oldPrice?: number;

    @IsNumber()
    price: number

    @IsNumber()
    rating: number

    @IsBoolean()
    isSendTelegram: boolean

    @IsString()
    categoryId: Types.ObjectId;
}