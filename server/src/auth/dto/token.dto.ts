import { IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsString({ message: 'Did not pass refresh token' })
  refreshToken: string;
}
