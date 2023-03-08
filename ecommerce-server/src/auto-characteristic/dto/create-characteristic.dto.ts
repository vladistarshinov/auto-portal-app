import {IsBoolean, IsNumber, IsOptional, IsString } from "class-validator"
import { Types } from "mongoose"

export class CreateAutoDto {

	@IsString()
	vin: string

	@IsNumber()
	year: number

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