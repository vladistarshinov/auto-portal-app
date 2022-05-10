import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Types } from 'mongoose';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { User } from './decorators/user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserModel } from './user.model';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
	constructor(private readonly _userService: UserService) {}

	@Get('profile')
	@Auth()
	async getProfile(@User('_id') _id: string) {
		return this._userService.getProfile(_id);
	}

	@UsePipes(new ValidationPipe())
	@Put('profile')
	@HttpCode(200)
	@Auth()
	async updateProfile(@User('_id') _id: string, @Body() data: UpdateUserDto) {
		return this._userService.updateProfile(_id, data);
	}

	@Get()
	@Auth('admin')
	async getUsers(@Query('searchTerm') searchTerm?: string) {
		return this._userService.getAll(searchTerm);
	}

	@Get(':id')
	@Auth('admin')
	async getUser(@Param('id', IdValidationPipe) _id: string) {
		return this._userService.getProfile(_id);
	}

	@UsePipes(new ValidationPipe())
	@Put(':id')
	@HttpCode(200)
	@Auth('admin')
	async updateUser(
		@Param('id', IdValidationPipe) _id: string,
		@Body() data: UpdateUserDto
	) {
		return this._userService.updateProfile(_id, data);
	}

	@Delete(':id')
	@Auth('admin')
	async delete(@Param('id', IdValidationPipe) _id: string) {
		const deletedDoc = await this._userService.delete(_id);
		if (!deletedDoc) throw new NotFoundException('Movie not found');
	}
}
