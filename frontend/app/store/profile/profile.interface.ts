export interface IUserResponse {
	_id: string;
	email: string;
	firstName: string;
	lastName: string;
	isAdmin: boolean;
	favourites: [];
}

export interface IInitialProfileState {
	profile: IUserResponse | null;
	isLoading: boolean;
}