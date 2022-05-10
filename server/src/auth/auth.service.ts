import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { UserModel } from 'src/user/user.model';
import { AuthDto, RegisterDto } from './dto/auth.dto';
import { hash, genSalt, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from './dto/token.dto';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(UserModel) private readonly _userModel: ModelType<UserModel>,
		private readonly _jwtService: JwtService
	) {}

	async register(dto: RegisterDto) {
		const oldUser = await this._userModel.findOne({ email: dto.email });

		if (oldUser)
			throw new BadRequestException(
				'User with this email was found in the system'
			);

		const salt = await genSalt(10);
		const newUser = new this._userModel({
			email: dto.email,
			name: dto.name,
			password: await hash(dto.password, salt),
		});

		const savedUser = await newUser.save();

		const tokens = await this.issueTokenPair(String(savedUser._id));

		return {
			user: this.returnUserFields(savedUser),
			...tokens,
		};
	}

	async login(dto: AuthDto) {
		const user = await this.validateUser(dto);
		const tokens = await this.issueTokenPair(String(user._id));
		return {
			user: this.returnUserFields(user),
			...tokens,
		};
	}

	async validateUser(dto: AuthDto): Promise<UserModel> {
		const user = await this._userModel.findOne({ email: dto.email });

		if (!user) {
			throw new UnauthorizedException('User not found');
		}

		const isValidPassword = await compare(dto.password, user.password);

		if (!isValidPassword) {
			throw new UnauthorizedException('Invalid password');
		}

		return user;
	}

	async issueTokenPair(userId: string) {
		const data = { _id: userId };

		const accessToken = await this._jwtService.signAsync(data, {
			expiresIn: '1h',
		});

		const refreshToken = await this._jwtService.signAsync(data, {
			expiresIn: '14d',
		});

		return { accessToken, refreshToken };
	}

	async getNewTokens({ refreshToken }: RefreshTokenDto) {
		if (!refreshToken) throw new UnauthorizedException('Please sign in');

		const res = await this._jwtService.verifyAsync(refreshToken);
		if (!res) throw new UnauthorizedException('Invalid token or expired');

		const user = await this._userModel.findById(res._id);
		const tokens = await this.issueTokenPair(String(user._id));
		return {
			user: this.returnUserFields(user),
			...tokens,
		};
	}

	returnUserFields(user: UserModel) {
		return {
			_id: user._id,
			email: user.email,
			name: user.name,
			isAdmin: user.isAdmin,
		};
	}
}
