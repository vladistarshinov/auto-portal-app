import {Body, Controller, Delete, Get, HttpCode, Param, Patch, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { UserDocument } from './schema/user.schema';
import { User } from './decorators/user.decorator';
import { UserService } from './user.service'
import { UpdateUserDto } from './dto/update-user.dto';
import { IdValidationPipe } from 'pipes/id-validation.pipe';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Auth()
    @Get('profile')
    public getProfile(@User('_id') _id: string): Promise<UserDocument> {
        return this.userService.getById(_id)
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Auth()
    @Patch('profile')
    public updateProfile(
        @User('_id') _id: string,
        @Body() dto: UpdateUserDto
    ): Promise<UserDocument> {
        return this.userService.update(_id, dto)
    }

    @Auth('admin')
    @Get()
    public getUsers(@Query('searchTerm') searchTerm?: string) {
        return this.userService.getAll(searchTerm)
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Auth('admin')
    @Patch(':id')
    public updateUser(
        @Param('id', IdValidationPipe) id: string,
        @Body() dto: UpdateUserDto
    ): Promise<UserDocument> {
        return this.userService.update(id, dto)
    }

    @HttpCode(200)
    @Auth('admin')
    @Delete(':id')
    public deleteUser(
        @Param('id', IdValidationPipe) id: string
    ): Promise<UserDocument> {
        return this.userService.delete(id)
    }
}

