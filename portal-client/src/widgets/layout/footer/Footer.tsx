import { FC } from "react"
import {
	Box,
	Container
} from "@mui/material"

import s from './Footer.module.scss'

const Footer: FC = () => {

	return (
		<Box className={s.wrapper}>
			<Container>
				<Box className={s.text}>
					Copyright &copy; Автоголд
				</Box>
			</Container>
		</Box>
	)
}

export default Footer
