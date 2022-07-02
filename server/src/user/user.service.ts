import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { genSalt, hash } from 'bcryptjs';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserModel } from './user.model';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>
	) {}

	async getProfile(id: string) {
		const user = await this.userModel.findById(id).exec();

		if (user) return user;
		throw new NotFoundException('User not found');
	}

	/**
	 * Admin place
	 */

	async updateProfile(_id: string, dto: UpdateUserDto) {
		const user = await this.getProfile(_id);
		const isSameUser = await this.userModel.findOne({ email: dto.email });

		if (isSameUser && String(_id) !== String(isSameUser._id)) {
			throw new NotFoundException('Email is busy');
		}

		if (dto.password) {
			const salt = await genSalt(10);
			user.password = await hash(dto.password, salt);
		}

		user.email = dto.email;
		user.name = dto.name;

		if (dto.isAdmin || dto.isAdmin === false) user.isAdmin = dto.isAdmin;
		if (dto.isActive || dto.isActive === true) user.isActive = dto.isActive;

		await user.save();
		return;
	}

	async getAll(searchTerm?: string) {
		let options = {};

		if (searchTerm) {
			options = {
				$or: [
					{
						email: new RegExp(searchTerm, 'i'),
						name: new RegExp(searchTerm, 'i'),
					},
				],
			};
		}

		return this.userModel
			.find(options)
			.select('-password -updatedAt -__v')
			.sort({ createdAt: 'desc' })
			.exec();
	}

	async delete(_id: string) {
		return this.userModel.findByIdAndDelete(_id).exec();
	}
}
