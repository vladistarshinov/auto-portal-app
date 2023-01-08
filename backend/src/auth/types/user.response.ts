export class JwtTokensResponse {
    accessToken: string
    refreshToken: string
}

export class UserData {
    email: string
    isAdmin: boolean
}

export class UserResponse extends JwtTokensResponse {
    user: UserData
}