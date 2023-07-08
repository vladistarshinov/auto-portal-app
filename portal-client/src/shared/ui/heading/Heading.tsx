import { FC } from 'react'
import { Typography } from '@mui/material'
import s from './Heading.module.scss'

interface IHeading {
	title: string
	style?: string
}

const Heading: FC<IHeading> = ({title, style}) => {
	return (
		<Typography
			className={s.text}
			variant="inherit"
			component="h2"
		>
			{title}
		</Typography>
	)
}

export default Heading