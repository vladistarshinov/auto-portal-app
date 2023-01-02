import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { argon2id, hash } from 'argon2'
import { UserErrorConstants } from 'common/constants/error.constants'
import { Model } from 'mongoose'
import { UpdateUserDto } from './dto/update-user.dto'
import { User, UserDocument } from './schema/user.schema'

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<UserDocument>
    ) {}

    public async getAll(searchTerm?: string) {
        let options = {}
        if (searchTerm)
            options = {
                $or: [
                    {
                        email: new RegExp(searchTerm, 'i')
                    }
                ]
            }

        return this.userModel
            .find(options)
            .select('-password -updatedAt -__v')
            .sort({
                createdAt: 'desc'
            })
            .exec()
    }

    public async getById(_id: string): Promise<UserDocument> {
        const user = await this.userModel.findById(_id)
        if (!user) throw new NotFoundException(UserErrorConstants.USER_NOT_FOUND)
        return user
    }

    public async update(_id: string, dto: UpdateUserDto): Promise<UserDocument> {
        const user = await this.getById(_id)
        const sameUser = await this.userModel.findOne({email: dto.email})
        if (!sameUser && String(_id) !== String(sameUser._id))
            throw new NotFoundException(UserErrorConstants.MAIL_EXIST)

        if (dto.password) {
            user.password = await hash(dto.password, {
                type: argon2id,
                saltLength: 32,
                hashLength: 64,
            })
        }

        user.email = dto.email
        user.firstName = dto.firstName
        user.lastName = dto.lastName

        if (dto.isAdmin || dto.isAdmin === false) user.isAdmin = dto.isAdmin

        await user.save()
        return
    }

    public async delete(id: string): Promise<UserDocument> {
        return this.userModel.findByIdAndDelete(id).exec()
    }
}
