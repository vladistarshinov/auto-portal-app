import {IsBoolean, IsNumber, IsOptional, IsString } from "class-validator"
import { Types } from "mongoose"

export class CreateAutoDto {
	@IsString()
	title: string

	@IsString()
	brand: string

	@IsString()
	slug: string

	@IsString()
	imageUrl: string

	@IsOptional()
	@IsString()
	videoUrl?: string

	@IsString()
	vin: string

	@IsNumber()
	year: number

	@IsNumber()
	countInStock: number

	@IsNumber()
	countOfViews: number

	@IsString()
	transmission: string

	@IsNumber()
	mileage: number

	@IsString()
	engineType: string

	@IsNumber()
	enginePower: string

	@IsNumber()
	engineVolume: string

	@IsString()
	driveUnit: string

	@IsString()
	bodyType: string

	@IsString()
	color: string

	@IsString()
	steering: string

	@IsOptional()
	@IsNumber()
	oldPrice?: number;

	@IsNumber()
	price: number

	@IsBoolean()
	isSendTelegram: boolean
}