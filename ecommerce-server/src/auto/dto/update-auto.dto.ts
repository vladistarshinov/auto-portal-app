import {IsBoolean, IsNumber, IsOptional, IsString } from "class-validator"
import { Types } from "mongoose"

export class UpdateAutoDto {
	@IsOptional()
	@IsString()
	title?: string

	@IsOptional()
	@IsString()
	brand?: string

	@IsOptional()
	@IsString()
	slug?: string

	@IsOptional()
	@IsString()
	imageUrl?: string

	@IsOptional()
	@IsString()
	videoUrl?: string

	@IsOptional()
	@IsString()
	vin?: string

	@IsOptional()
	@IsNumber()
	year?: number

	@IsOptional()
	@IsNumber()
	countInStock?: number

	@IsOptional()
	@IsString()
	transmission?: string

	@IsOptional()
	@IsString()
	engine?: string

	@IsOptional()
	@IsString()
	engineVolume?: string

	@IsOptional()
	@IsString()
	driveUnit?: string

	@IsOptional()
	@IsString()
	bodyType?: string

	@IsOptional()
	@IsString()
	power?: string

	@IsOptional()
	@IsString()
	color?: string

	@IsOptional()
	@IsNumber()
	oldPrice?: number;

	@IsOptional()
	@IsNumber()
	price?: number

	@IsOptional()
	@IsBoolean()
	isSendTelegram?: boolean
}