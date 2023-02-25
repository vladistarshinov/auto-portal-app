import { FC } from "react"
import { Box } from "@mui/material"

import Footer from "./Footer"
import Header from "./Header"

const Layout: FC = ({children}) => {
	return (
		<>
			<Header />
			<Box sx={{flex: "1 0 auto",  minHeight: '95vh', overflowY: 'auto', pb: '2rem', pt: '6rem'}}>
				{children}
			</Box>
			<Footer />
		</>
	)
}

export default Layout