import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignUpDto } from './dto/sign-up.dto'
import { User } from '../user/schema/user.schema'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('register')
  public async register(@Body() dto: SignUpDto): Promise<User> {
    return this.authService.createUser(dto)
  }
}
