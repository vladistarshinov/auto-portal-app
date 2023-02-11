import { FC } from 'react'
import Box from '@mui/material/Box'
import AuthForm from '@/processes/auth/ui/AuthForm'

const Auth: FC = () => {

	return (
		<Box display="flex" alignItems="center" paddingTop='5%' flexDirection="column">
			<AuthForm />
		</Box>
	)
}

export default Auth