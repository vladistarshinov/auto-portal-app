import { FC, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Heading from '@/shared/ui/heading/Heading';
import AccountDataFields from './AccountDataFields';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IAuth, ILogin, IRegister } from './auth.interface';
import { useAuthRedirect } from './useAuthRedirect';
import { useAuthMutations } from './useAuthMutations';
import { useAuth } from '@/hooks/useAuth';
import { AuthService } from '@/services/auth/auth.service';
import { useMutation } from '@tanstack/react-query';
import { useActions } from '@/hooks/useActions';

const Auth: FC = () => {
	useAuthRedirect()

	const [type, setType] = useState<'login' | 'register'>('login')
	const {
		register: registerDto,
		handleSubmit,
		formState,
		reset,
	} = useForm<IAuth<ILogin | IRegister>>({
		mode: 'onChange',
		//resolver: yupResolver(LoginFormSchema),
	});

	const { register, login } = useActions();


	const onSubmit: SubmitHandler<IAuth<ILogin | IRegister>> = (data: any) => {
		if (type === 'login') {
			login(data)
		}
		 else if (type === 'register')  {
			register(data)
		}

		//reset();
	};

	return (
		<Box display="flex" alignItems="center" paddingTop='5%' flexDirection="column">
			<Heading title={type === 'login' ? 'Aвторизация': 'Регистрация'} />
			<form onSubmit={handleSubmit(onSubmit)}>
				<AccountDataFields
					type={type}
					formState={formState}
					register={registerDto}
					isPasswordRequired
				/>
				<Box sx={{ textAlign: 'center', mt: 3 }}>
					<Button  variant="outlined" color="inherit" type='submit'>
						{type === 'login' ? 'Войти' : 'Зарегистрироваться'}
					</Button>
				</Box>
			</form>
			<Box sx={{ py: 3 }}>
				<Box>
					{type === 'login' ? 'Новый пользователь?' : 'Уже есть аккаунт?'}{' '}
					{type === 'login' ? (
						<Link
							style={{ color: 'navy', textDecoration: 'none', cursor: 'pointer' }}
							onClick={() => setType('register')}
						>
							Зарегистрироваться
						</Link>
					) : (
						<Link
							style={{ color: 'navy', textDecoration: 'none', cursor: 'pointer' }}
							onClick={() => setType('login')}
						>
							Войти
						</Link>
					)
					}
				</Box>
			</Box>
		</Box>
	);
};

export default Auth;