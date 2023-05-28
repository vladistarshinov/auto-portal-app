import { FC, ReactNode } from "react"
import { Box, Typography } from "@mui/material"

interface TabPanelProps {
	children?: ReactNode
	index: number
	value: number
}

const TabPanel: FC<TabPanelProps> = ({ children, value, index, ...other }) =>  {

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	)
}

export default TabPanel