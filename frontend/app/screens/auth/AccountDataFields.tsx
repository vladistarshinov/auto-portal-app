import { FC, useState } from 'react';
import { validEmail } from '@/shared/regex';
import { Box, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { FormState, UseFormRegister } from 'react-hook-form';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

interface IAccountDataFields {
	register: UseFormRegister<any>;
	formState: FormState<any>;
	isPasswordRequired?: boolean;
}

const AccountDataFields: FC<IAccountDataFields> = ({
		 register,
		 formState: { errors },
		 isPasswordRequired = false,
	 }) => {
	const [showPassword, setShowPassword] = useState(false);
	return (
		<Box sx={{ mt: 3, minWidth: 300 }}>
			<TextField
				inputProps={register('email', {
					required: 'Email is required',
					pattern: {
						value: validEmail,
						message: 'Please enter a valid email',
					},
				})}
				sx={{ mt: 3 }}
				label="Email"
				id="outlined-basic"
				fullWidth
				type="email"
				placeholder="Введите email"
			/>
			<FormControl sx={{ mt: 3, width: '100%' }} variant="outlined">
				<InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
				<OutlinedInput
					id="outlined-adornment-password"
					type={showPassword ? 'text' : 'password'}
					placeholder="Введите пароль"
					inputProps={register(
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
		</Box>
	)
}

export default AccountDataFields