import { FC, SyntheticEvent, useState } from "react"
import {
	Box,
	Tabs,
	Tab
} from "@mui/material"

import {a11yProps} from '@/shared/libs/a11y-tab-props'
import TabPanel from "@/shared/ui/tab-panel/TabPanel"
import Profile from "@/entities/profile/ui/Profile"

const PersonalAreaScreen: FC = () => {
	const [tabValue, setTabValue] = useState(0)

	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setTabValue(newValue)
	}

	return (
		<Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
				<Box sx={{
					borderBottom: 1,
					borderColor: 'divider',
					display: 'flex',
					justifyContent: 'center'
				}}>
					<Tabs value={tabValue} onChange={handleChange} aria-label="lab API tabs example">
						<Tab label="Профиль" {...a11yProps(0)} />
						<Tab label="Мои заказы" {...a11yProps(1)} />
						<Tab label="Мои обращения" {...a11yProps(2)} />
					</Tabs>
				</Box>
			<TabPanel value={tabValue} index={0}>
				<Profile />
			</TabPanel>
			<TabPanel value={tabValue} index={1}>
				Item Two
			</TabPanel>
			<TabPanel value={tabValue} index={2}>
				Item Three
			</TabPanel>
		</Box>
	)
}

export default PersonalAreaScreen