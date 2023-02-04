import CheckoutSteps from "@/components/chechout-steps/CheckoutSteps";
import { useActions } from "@/hooks/useActions";
import { useOrder } from "@/hooks/useOrder";
import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import {
	useEffect
} from 'react';

const Shipping: FC = () => {
	const router = useRouter();
	const {saveShippingAddress} = useActions();
	const { shippingAddress } = useOrder()
	const [address, setAddress] = useState('');
	const [city, setCity] = useState('');
	const [postalCode, setPostalCode] = useState('');
	const [country, setCountry] = useState('');

	useEffect(() => {
			setAddress(shippingAddress!.address)
			setCity(shippingAddress!.city)
			setPostalCode(shippingAddress!.postalCode)
			setCountry(shippingAddress!.country)
	}, [shippingAddress])

	const submitHandler = () => {
		saveShippingAddress({ address, city, country, postalCode })
		router.push("/payment");
	};

	return (
		<Box marginX={10}>
			<CheckoutSteps currentStep={0} />
			<Typography variant="h4" style={{ padding: "1rem 0" }}>
				Доставка
			</Typography>
			<Box>
				<TextField
					sx={{ mt: 3, width: '55%' }}
					label="Адрес"
					id="outlined-basic"
					size="small"
					type="text"
					placeholder="Введите адрес"
					value={address}
					onChange={(e) => setAddress(e.target.value)}
				/>
				<TextField
					sx={{ mt: 3, width: '55%' }}
					label="Город"
					id="outlined-basic"
					size="small"
					fullWidth
					type="text"
					placeholder="Введите город"
					value={city}
					onChange={(e) => setCity(e.target.value)}
				/>
				<TextField
					sx={{ mt: 3, width: '55%' }}
					label="Почтовый индекс"
					id="outlined-basic"
					size="small"
					fullWidth
					type="text"
					placeholder="Введите почтовый индекс"
					value={postalCode}
					onChange={(e) => setPostalCode(e.target.value)}
				/>
				<TextField
					sx={{ mt: 3, width: '55%' }}
					label="Страна"
					id="outlined-basic"
					size="small"
					fullWidth
					type="text"
					placeholder="Введите страну"
					value={country}
					onChange={(e) => setCountry(e.target.value)}
				/>
			</Box>
			<Button
				variant="outlined"
				sx={{ mt: 3 }}
				color="inherit"
				onClick={submitHandler}
			>
				<Link sx={{ textDecoration: 'none', color: 'black' }}>
					Продолжить
				</Link>
			</Button>
		</Box>
	);
};

export default Shipping;
