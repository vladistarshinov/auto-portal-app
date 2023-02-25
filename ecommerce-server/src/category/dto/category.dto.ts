import { IsString } from "class-validator"

export class CategoryDto {
    @IsString()
    title: string

    @IsString()
    description: string

    @IsString()
    slug: string

    @IsString()
    icon: string
}