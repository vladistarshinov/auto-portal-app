import { IsEmail, IsString } from "class-validator";

export class UpdateUserDto {
    @IsEmail()
    email: string

    firstName?: string

    lastName?: string

    password?: string

    isAdmin?: boolean
}