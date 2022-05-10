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

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(UserModel) private readonly _userModel: ModelType<UserModel>
	) {}

	async register(dto: RegisterDto): Promise<UserModel> {
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

		return newUser.save();
	}

	async login(dto: AuthDto): Promise<UserModel> {
		return await this.validateUser(dto);
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
}
