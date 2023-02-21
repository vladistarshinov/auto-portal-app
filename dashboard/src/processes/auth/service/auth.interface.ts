export interface ILoginDto {
  email: string;
  password: string;
}

export interface IUser {
  email: string
  isAdmin: boolean
  firstName: string
  lastName: string
}

export interface ITokens {
  accessToken: string
  refreshToken: string
}

export interface IAuthResponse extends ITokens {
  user: IUser
}
