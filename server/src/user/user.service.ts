import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { UserModel } from './user.model';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(UserModel) private readonly _userModel: ModelType<UserModel>
	) {}

	async getById(id: string) {
		const user = await this._userModel.findById(id).exec();

		if (user) return user;
		throw new NotFoundException('User not found');
	}
}
