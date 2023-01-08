import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { User, UserDocument } from '../user/schema/user.schema'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { SignUpDto } from './dto/sign-up.dto'
import { verify, hash, argon2id } from 'argon2'
import { AuthErrorConstants } from 'common/constants/error.constants'
import { SignInDto } from './dto/sign-in.dto'
import { JwtService } from '@nestjs/jwt'
import { JwtTokensResponse, UserResponse } from './types/user.response'
import { RefreshTokenDto } from './dto/refresh-token.dto'
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService
  ) {}

  public async signUp(dto: SignUpDto): Promise<UserResponse> {
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

    const tokens = await this.createJwtTokens(newUser.email)

    await newUser.save()

    return {
      user: {
        email: newUser.email,
        isAdmin: newUser.isAdmin,
      },
      ...tokens
    }
  }

  public async signIn(dto: SignInDto): Promise<UserResponse> {
    const user = await this.validateUser(dto)
    const tokens = await this.createJwtTokens(user.email)

    return {
      user: {
        email: user.email,
        isAdmin: user.isAdmin,
      },
      ...tokens
    }
  }

  public async getNewTokens({refreshToken}: RefreshTokenDto): Promise<UserResponse> {
    if (!refreshToken) throw new UnauthorizedException(AuthErrorConstants.LOGIN)

    const res = await this.jwtService.verifyAsync(refreshToken)
    if (!res) throw new UnauthorizedException(AuthErrorConstants.INVALID_TOKEN)

    const user = await this.userModel.findOne({email: res.email})
    const tokens = await this.createJwtTokens(res.email)

    return {
      user: {
        email: user.email,
        isAdmin: user.isAdmin,
      },
      ...tokens
    }
  }

  private async findUser(email: string): Promise<User> {
   return this.userModel.findOne({ email })
  }

  private async validateUser(dto: SignInDto): Promise<Pick<User, 'email' | 'isAdmin'>> {
    const user = await this.findUser(dto.email)
    if (!user) throw new UnauthorizedException(AuthErrorConstants.USER_NOT_FOUND)

    const isCorrectPassword = await verify(user.password, dto.password)
    if (!isCorrectPassword) throw new UnauthorizedException(AuthErrorConstants.PASSWORD_INCORRECT)

    return {
      email: user.email,
      isAdmin: user.isAdmin
    }
  }

  private async createJwtTokens(email: string): Promise<JwtTokensResponse> {
    const accessToken = await this.jwtService.signAsync({email}, {expiresIn: '1h'})
    const refreshToken = await this.jwtService.signAsync({email}, {expiresIn: '7d'})
    return {
      accessToken,
      refreshToken
    }
  }
}
