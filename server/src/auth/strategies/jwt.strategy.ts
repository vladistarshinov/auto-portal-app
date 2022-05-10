import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserModel } from 'src/user/user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		@InjectModel(UserModel) private readonly _userModel: ModelType<UserModel>,
		private readonly _configService: ConfigService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: true,
			secretOrKey: _configService.get('JWT_SECRET'),
		});
	}

	async validate({ _id }: Pick<UserModel, '_id'>) {
		const user = await this._userModel.findById(_id);
		return user;
	}
}
