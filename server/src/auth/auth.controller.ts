import {
	BadRequestException,
	Body,
	Controller,
	HttpCode,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, RegisterDto } from './dto/auth.dto';
import { RefreshTokenDto } from './dto/token.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly _authService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async login(@Body() dto: AuthDto) {
		return this._authService.login(dto);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login/access-token')
	async getNewTokens(@Body() dto: RefreshTokenDto) {
		return this._authService.getNewTokens(dto);
	}

	@UsePipes(new ValidationPipe())
	@Post('register')
	async register(@Body() dto: RegisterDto) {
		return this._authService.register(dto);
	}
}
