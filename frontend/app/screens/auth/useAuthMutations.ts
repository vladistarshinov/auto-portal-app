import { useMutation } from '@tanstack/react-query'
import { SetStateAction, useMemo } from 'react'
import { UseFormReset } from 'react-hook-form';

import { useAuth } from '@/hooks/useAuth';

import { AuthService } from '@/services/auth/auth.service';
import { IAuth, ILogin, IRegister } from './auth.interface';
import { IUser } from '@/shared/types/user.types';

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
