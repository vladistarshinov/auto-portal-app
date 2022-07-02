import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { User } from './decorators/user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	/**
	 * @desc Get user profile
	 * @route GET /api/profile
	 * @access Private
	 */
	@Get('profile')
	@Auth()
	async getProfile(@User('_id') _id: string) {
		return this.userService.getProfile(_id);
	}

	/**
	 * @desc Update user profile
	 * @route PUT /api/profile
	 * @access Private
	 */
	@UsePipes(new ValidationPipe())
	@Put('profile')
	@HttpCode(200)
	@Auth()
	async updateProfile(@User('_id') _id: string, @Body() data: UpdateUserDto) {
		return this.userService.updateProfile(_id, data);
	}

	/**
	 * @desc Get users for admin
	 * @route GET /api/profile
	 * @access Private
	 */
	@Get()
	@Auth('admin')
	async getUsers(@Query('searchTerm') searchTerm?: string) {
		return this.userService.getAll(searchTerm);
	}

	/**
	 * @desc Get user for admin
	 * @route GET /api/profile/:id
	 * @access Private
	 */
	@Get(':id')
	@Auth('admin')
	async getUser(@Param('id', IdValidationPipe) _id: string) {
		return this.userService.getProfile(_id);
	}

	/**
	 * @desc Update user data for admin
	 * @route PUT /api/profile/:id
	 * @access Private
	 */
	@UsePipes(new ValidationPipe())
	@Put(':id')
	@HttpCode(200)
	@Auth('admin')
	async updateUser(
		@Param('id', IdValidationPipe) _id: string,
		@Body() data: UpdateUserDto
	) {
		return this.userService.updateProfile(_id, data);
	}

	/**
	 * @desc Delete user from system for admin
	 * @route DELETE /api/profile/:id
	 * @access Private
	 */
	@Delete(':id')
	@Auth('admin')
	async delete(@Param('id', IdValidationPipe) _id: string) {
		const deletedDoc = await this.userService.delete(_id);
		if (!deletedDoc) throw new NotFoundException('User not found');
	}
}
