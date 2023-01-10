interface IAccountName {
	firstName: string;
	lastName: string
}

export type IAuth<T = 'login'> = {
	email: string;
	password: string;
} & ([T] extends ['register'] ? IAccountName : {})


export type ILogin = {
	email: string;
	password: string;
}

export type IRegister = {
	email: string;
	password: string;
} & IAccountName