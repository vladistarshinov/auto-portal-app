import { Box } from "@mui/material";
import { FC } from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout: FC = ({children}) => {
	return (
		<>
			<Header />
			<Box sx={{flex: "1 0 auto", height: '83vh'}}>
				{children}
			</Box>
			<Footer />
		</>
	)
}

export default Layout