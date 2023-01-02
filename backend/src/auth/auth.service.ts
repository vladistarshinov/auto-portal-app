import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { User, UserDocument } from '../user/schema/user.schema'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { SignUpDto } from './dto/sign-up.dto'
import { verify, hash, argon2id } from 'argon2'
import { AuthErrorConstants } from 'common/constants/error.constants'
import { SignInDto } from './dto/sign-in.dto'
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}

  public async signUp(dto: SignUpDto): Promise<User> {
    const oldUser = await this.findUser(dto.email)
    if (oldUser)
      throw new BadRequestException(
          AuthErrorConstants.MAIL_EXIST
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

  public async signIn(dto: SignInDto): Promise<Pick<User, 'email'>> {
    const userEmail = this.validateUser(dto)
    return userEmail
  }

  private async findUser(email: string): Promise<User> {
   return this.userModel.findOne({ email })
  }

  private async validateUser(dto: SignInDto): Promise<Pick<User, 'email'>> {
    const user = await this.findUser(dto.email)
    if (!user) throw new UnauthorizedException(AuthErrorConstants.USER_NOT_FOUND)

    const isCorrectPassword = await verify(user.password, dto.password)
    if (!isCorrectPassword) throw new UnauthorizedException(AuthErrorConstants.PASSWORD_INCORRECT)

    return {
      email: user.email
    }
  }
}
