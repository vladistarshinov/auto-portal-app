import { FC, useState } from 'react';
import { validEmail } from '@/shared/regex';
import { Box, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { FormState, UseFormGetValues, UseFormRegister } from 'react-hook-form';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

interface IAccountDataFields {
	type: 'login' | 'register' | 'profile';
	register: UseFormRegister<any>;
	formState: FormState<any>;
	isPasswordRequired?: boolean;
}

const AccountDataFields: FC<IAccountDataFields> = ({
	   type,
		 register,
		 formState: { errors },
		 isPasswordRequired = false,
	 }) => {
	const [showPassword, setShowPassword] = useState(false);
	return (
		<Box sx={{ mt: 3, minWidth: 300 }}>
			<TextField
				{...register('email', { required: true })}
				sx={{ mt: 3 }}
				label="Email"
				id="outlined-basic"
				fullWidth
				type="email"
				name="email"
				placeholder="Введите email"
			/>
			{type !== 'profile' && (
				<FormControl sx={{ mt: 3, width: '100%' }} variant="outlined">
					<InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
					<OutlinedInput
						id="outlined-adornment-password"
						type={showPassword ? 'text' : 'password'}
						placeholder="Введите пароль"
						{...register(
							'password',
							isPasswordRequired
								? {
									required: 'Password is required',
									minLength: {
										value: 6,
										message: 'Min length should more 6 symbols',
									},
								}
								: {}
						)}
						name="password"
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									edge="end"
									onClick={() => {
										setShowPassword(!showPassword);
									}}
									onMouseDown={(e) => {
										e.preventDefault();
									}}
								>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						}
						label="Password"
					/>
				</FormControl>
			)}
			{type === 'register' || type === 'profile' && (
				<>
					<TextField
						{...register('firstName', { required: true })}
						sx={{ mt: 3 }}
						label="Имя"
						id="outlined-basic"
						fullWidth
						type="text"
						name="firstName"
						placeholder="Введите имя"
					/>
					<TextField
						{...register('lastName', { required: true })}
						sx={{ mt: 3 }}
						label="Фамилия"
						id="outlined-basic"
						fullWidth
						type="text"
						name="lastName"
						placeholder="Введите фамилию"
					/>
				</>
			)}
		</Box>
	)
}

export default AccountDataFields