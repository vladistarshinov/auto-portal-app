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

	@IsString()
	transmission: string

	@IsString()
	engine: string

	@IsString()
	engineVolume: string

	@IsString()
	driveUnit: string

	@IsString()
	bodyType: string

	@IsString()
	power: string

	@IsString()
	color: string

	@IsOptional()
	@IsNumber()
	oldPrice?: number;

	@IsNumber()
	price: number

	@IsBoolean()
	isSendTelegram: boolean
}