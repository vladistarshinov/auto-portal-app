import CheckoutSteps from "@/components/chechout-steps/CheckoutSteps";
import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { FC, useState } from "react";

const Shipping: FC = () => {

	const submitHandler = (e: any) => {
		e.preventDefault();
		// dispatch
		//history.push("/payment");
	};

	return (
		<Box marginX={10}>
			<CheckoutSteps currentStep={0} />
			<Typography variant="h4" style={{ padding: "1rem 0" }}>
				Доставка
			</Typography>
			<Box>
				<TextField
					sx={{ mt: 3 }}
					label="Адрес"
					id="outlined-basic"
					size="small"
					fullWidth
					type="text"
					placeholder="Введите адрес"
					//value={address}
					onChange={(e) => {}}
				/>
				<TextField
					sx={{ mt: 3 }}
					label="Город"
					id="outlined-basic"
					size="small"
					fullWidth
					type="text"
					placeholder="Введите город"
					//value={city}
					onChange={(e) => {}}
				/>
				<TextField
					sx={{ mt: 3 }}
					label="Почтовый индекс"
					id="outlined-basic"
					size="small"
					fullWidth
					type="text"
					placeholder="Введите почтовый индекс"
					//value={postalCode}
					onChange={(e) => {}}
				/>
				<TextField
					sx={{ mt: 3 }}
					label="Страна"
					id="outlined-basic"
					size="small"
					fullWidth
					type="text"
					placeholder="Введите страну"
					//value={country}
					onChange={(e) => {}}
				/>

				<Button
					variant="outlined"
					sx={{ mt: 3 }}
					color="inherit"
				>
					<Link sx={{ textDecoration: 'none', color: 'black' }} href={'/payment'}>
						Продолжить
					</Link>
				</Button>
			</Box>
		</Box>
	);
};

export default Shipping;
