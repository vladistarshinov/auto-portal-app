import { FC, useState } from "react";
import {
	Box,
} from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {a11yProps} from '@/utils/a11y-tab-props'
import TabPanel from "@/shared/ui/tab-panel/TabPanel";
import Profile from "@/components/profile/Profile";

const PersonalArea: FC = () => {
	const [tabValue, setTabValue] = useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setTabValue(newValue);
	};

	return (
		<Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
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
	);
};

export default PersonalArea;



/*
* <FormControl>
									<TextField
										id="outlined-basic"
										sx={{ my: 1 }}
										type="name"
										placeholder="Введите имя"
										label="Имя"
									/>
								</FormControl>
								<FormControl>
									<TextField
										id="outlined-basic"
										sx={{ my: 1 }}
										type="name"
										placeholder="Введите фамилию"
										label="Фамилия"
									/>
								</FormControl>
								<FormControl>
									<TextField
										id="outlined-basic"
										type="email"
										sx={{ my: 1 }}
										placeholder="Введите email"
										label="Email"

									/>
								</FormControl>
								<Box display="flex" flexDirection="column">
									<Button
										variant="outlined"
										color="inherit"
										sx={{ my: 1 }}
										onClick={() => setOpen(true)}
									>
										Изменить пароль
									</Button>
									<Button
										variant="outlined"
										color="inherit"
										sx={{ my: 1 }}
									>
										Обновить
									</Button>
								</Box>
*
*  */