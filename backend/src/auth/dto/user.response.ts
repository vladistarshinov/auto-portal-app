export class JwtTokensResponse {
    accessToken: string
    refreshToken: string
}

export class UserResponse extends JwtTokensResponse {
    email: string
    isAdmin: boolean
}