interface IAccountName {
	firstName: string;
	lastName: string
}

export type IAuth<T = 'login'> = {
	email: string;
	password: string;
} & ([T] extends ['register'] ? IAccountName : {})
