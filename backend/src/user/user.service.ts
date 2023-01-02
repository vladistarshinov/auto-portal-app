import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<UserDocument>
    ) {}

    public async getById(_id: string): Promise<User> {
        const user = await this.userModel.findById(_id)
        if (!user) throw new NotFoundException('Пользователь не найден')
        return user
    }
}
