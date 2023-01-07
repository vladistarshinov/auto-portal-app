import { FC, useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const Auth: FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	return (
		<Box display="flex" alignItems="center" flexDirection="column">
			<Typography
				variant="inherit"
				component="h2"
				style={{ padding: '1rem 0' }}
			>
				Авторизация
			</Typography>
			<Box sx={{ mt: 3, minWidth: 300 }}>
				<TextField
					sx={{ mt: 3 }}
					label="Email"
					id="outlined-basic"
					fullWidth
					type="email"
					placeholder="Введите email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<FormControl sx={{ mt: 3, width: '100%' }} variant="outlined">
					<InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
					<OutlinedInput
						id="outlined-adornment-password"
						type={showPassword ? 'text' : 'password'}
						placeholder="Введите пароль"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						endAdornment={
							<InputAdornment position="end">
								<IconButton aria-label="toggle password visibility" edge="end">
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						}
						label="Password"
					/>
				</FormControl>
				<Box sx={{ textAlign: 'center', mt: 3 }}>
					<Button variant="outlined" color="inherit">
						Войти
					</Button>
				</Box>
			</Box>
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
