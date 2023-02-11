import { useMutation } from '@tanstack/react-query'
import { SetStateAction, useMemo } from 'react'
import { UseFormReset } from 'react-hook-form';

import { IUser } from '@/shared/types/user.types';
import { AuthService } from '../auth.service';
import { IAuth, ILogin, IRegister } from '../types/auth.interface';
import { useAuth } from './useAuth';

export const useAuthMutations = (reset: UseFormReset<ILogin> | UseFormReset<IRegister>) => {
	const { user } = useAuth();

	const { mutate: login, isLoading: isLoginLoading } = useMutation(
		['login'],
		({ email, password }: IAuth<'login'>) =>
			AuthService.login(email, password),
		{
			onSuccess(data) {
				console.log(data)
				reset()
			}
		}
	)

	const { mutate: register, isLoading: isRegisterLoading } = useMutation(
		['register'],
		({ email, password, firstName, lastName }: IAuth<'register'>) =>
			AuthService.register(email, password, firstName, lastName),
		{
			onSuccess(data) {
				setTimeout(() => {
					reset()
				})
			}
		}
	)

	return useMemo(
		() => ({
			login,
			register,
			isLoading: isLoginLoading || isRegisterLoading
		}),
		[isLoginLoading, isRegisterLoading]
	)
}
