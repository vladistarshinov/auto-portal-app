import { BadRequestException, Injectable } from '@nestjs/common'
import { User, UserDocument } from '../user/schema/user.schema'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { SignUpDto } from './dto/sign-up.dto'
import { verify, hash, argon2id } from 'argon2'
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}

  public async createUser(dto: SignUpDto): Promise<User> {
    const oldUser = await this.userModel.findOne({ email: dto.email })
    if (oldUser)
      throw new BadRequestException(
        'Пользователь с такой эл. почтой уже существует'
      )
    const newUser = new this.userModel({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      password: await hash(dto.password, {
        type: argon2id,
        saltLength: 32,
        hashLength: 64,
      }),
    })

    return newUser.save()
  }
}
