import { Controller, Get } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { User as UserModel } from './schema/user.schema';
import { User } from './decorators/user.decorator';
import { UserService } from './user.service'

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Auth()
    @Get('profile')
    public async getProfile(@User('_id') _id: string): Promise<UserModel> {
        return this.userService.getById(_id)
    }
}
