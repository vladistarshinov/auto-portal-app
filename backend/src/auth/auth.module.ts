import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from '../user/schema/user.schema'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { getJwtConfig } from '../../config/jwt.config'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
