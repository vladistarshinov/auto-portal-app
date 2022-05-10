import { IsString, IsEmail, MinLength } from 'class-validator';

export class AuthDto {
	@IsEmail()
	email: string;

	@IsString()
	password: string;
}

export class RegisterDto {
	@IsString()
	name: string;

	@IsEmail()
	email: string;

	@MinLength(6, {
		message: 'Password cannot be less than 6 characters',
	})
	@IsString()
	password: string;
}
