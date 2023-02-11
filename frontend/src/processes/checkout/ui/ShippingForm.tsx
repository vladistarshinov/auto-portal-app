import { useCheckout } from "@/processes/checkout/model/useCheckout"
import { useActions } from "@/shared/hooks/useActions"
import CheckoutSteps from "@/widgets/chechout-steps/CheckoutSteps"
import { Box, Button, Link, TextField, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { FC, useState } from "react"
import { useEffect } from 'react'

const ShippingForm = () => {
	const router = useRouter()
	const {saveShippingAddress} = useActions()
	const { shippingAddress } = useCheckout()
	const [address, setAddress] = useState('')
	const [city, setCity] = useState('')
	const [postalCode, setPostalCode] = useState('')
	const [country, setCountry] = useState('')

	useEffect(() => {
		setAddress(shippingAddress?.address || '')
		setCity(shippingAddress?.city || '')
		setPostalCode(shippingAddress?.postalCode || '')
		setCountry(shippingAddress?.country || '')
	}, [shippingAddress])

	const submitHandler = () => {
		saveShippingAddress({ address, city, country, postalCode })
		router.push("/payment")
	};

	return (
		<>
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
		</>
	)
}

export default ShippingForm