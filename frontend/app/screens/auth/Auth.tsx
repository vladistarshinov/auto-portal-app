import { FC, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Heading from '@/shared/ui/heading/Heading';
import AccountDataFields from './AccountDataFields';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IAuth } from './auth.interface';
import { FormControl } from '@mui/material';
import { useAuth } from '@/hooks/useAuth';
import { useActions } from '@/hooks/useActions';

const Auth: FC = () => {
	const { isLoading } = useAuth();

	const [type, setType] = useState<'login' | 'register'>('login')

	const { register, login } = useActions();

	// mode - ошибки при каждом вводе поля
	const {
		register: registerInput,
		handleSubmit,
		formState,
		reset,
	} = useForm<IAuth>({
		mode: 'onChange',
		//resolver: yupResolver(LoginFormSchema),
	});

	const onSubmit: SubmitHandler<IAuth> = (data) => {
		if (type === 'login') login(data)
		else if (type === 'register')  register(data)

		reset();
	};

	return (
		<Box display="flex" alignItems="center" flexDirection="column">
			<Heading title='Aвторизация' />
			<FormControl>
				<AccountDataFields
					formState={formState}
					register={registerInput}
					isPasswordRequired
				/>
				<Box sx={{ textAlign: 'center', mt: 3 }}>
					<Button variant="outlined" color="inherit" onClick={handleSubmit(onSubmit)}>
						Войти
					</Button>
				</Box>
			</FormControl>
			<Box sx={{ py: 3 }}>
				<Box>
					Новый пользователь?{' '}
					<Link
						style={{ color: 'navy', textDecoration: 'none' }}
						href={'/register'}
					>
						Зарегистрироваться
					</Link>
				</Box>
			</Box>
		</Box>
	);
};

export default Auth;
