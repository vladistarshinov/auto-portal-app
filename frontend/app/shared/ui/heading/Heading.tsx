import { Typography } from '@mui/material';
import {FC} from 'react';

interface IHeading {
	title: string
	style?: string
}

const Heading: FC<IHeading> = ({title, style}) => {
	return (
		<Typography
			variant="inherit"
			component="h2"
			style={{ padding: '1rem 0' }}
		>
			{title}
		</Typography>
	)
}

export default Heading