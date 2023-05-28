export interface IUser {
	email: string
	isAdmin: boolean
	firstName: string
	lastName: string
}

export interface IUserState {
	email: string
	firstName?: string
	lastName?: string
	isAdmin: boolean
}

export interface ITokens {
	accessToken: string
	refreshToken: string
}

export interface IInitialState {
	user: IUserState | null
	isLoading: boolean
}

export interface IAuthRequest {
	email: string
	password: string
}

export interface IAuthResponse extends ITokens {
	user: IUser
}

export interface IUserResponse {
	_id: string
	email: string
	firstName: string
	lastName: string
	isAdmin: boolean
	favourites: []
}

export interface IInitialProfileState {
	profile: IUserResponse | null
	isLoading: boolean
}