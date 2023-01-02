import { IsEmail, IsString, Length } from 'class-validator'

export class SignInDto {
  @IsEmail()
  readonly email: string

  @IsString()
  @Length(6, 50, {
    message: 'Пароль не должен содержать менее 6 и более 50 символов',
  })
  readonly password: string
}
