import { IsString, IsEmail } from 'class-validator';

export class UpdateUserDto {
	@IsString()
	name: string;

	@IsEmail()
	email: string;

	password?: string;
	isAdmin?: boolean;
	isActive?: boolean;
}
