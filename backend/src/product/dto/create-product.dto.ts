import {IsBoolean, IsNumber, IsString } from "class-validator"

export class CreateProductDto {
    @IsString()
    title: string

    @IsString()
    description: string

    @IsString()
    imageUrl: string

    videoUrl?: string

    @IsString()
    brand: string

    @IsNumber()
    price: number

    @IsNumber()
    countInStock: number

    @IsNumber()
    countOfViews: number

    @IsNumber()
    rating: number

    @IsBoolean()
    isSendTelegram: boolean
}