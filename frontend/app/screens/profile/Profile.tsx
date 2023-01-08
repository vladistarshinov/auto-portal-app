import { FC, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Heading from "@/shared/ui/heading/Heading";
import { useActions } from "@/hooks/useActions";


const Profile: FC = () => {
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState(null);

	return (
		<Grid container display="inline-flex" justifyContent="space-around" paddingTop='5%'>
			<Grid item lg={3} md={3} sm={6} mr={2}>
				<Card>
					<CardContent>
						<Heading title='Профиль' />
						<Box display="flex" flexDirection="column">
								<FormControl>
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
							</Box>
					</CardContent>
				</Card>
				{/* */}
			</Grid>
		</Grid>
	);
};

export default Profile;