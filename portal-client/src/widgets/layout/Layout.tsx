import { FC } from "react"
import { Box } from "@mui/material"

import Footer from "./footer/Footer"
import Header from "./header/Header"

import s from './Layout.module.scss'

const Layout: FC = ({children}) => {
	return (
		<>
			<Header />
			<Box className={s.container}>
				{children}
			</Box>
			<Footer />
		</>
	)
}

export default Layout