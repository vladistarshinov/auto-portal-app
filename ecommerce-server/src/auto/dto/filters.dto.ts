import { IsOptional, IsString } from "class-validator"

export class FiltersDto {
	@IsOptional()
	@IsString()
	color: string

	@IsOptional()
	@IsString()
	brand: string

	@IsOptional()
	@IsString()
	price: string
}