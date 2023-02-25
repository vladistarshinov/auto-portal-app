import { FC, useState } from 'react'
import { Box, Button, FormControl, InputBase, InputLabel, MenuItem, Select, SelectChangeEvent, styled, TextField } from "@mui/material"
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import LayersIcon from '@mui/icons-material/Layers';

import { getStrapiMediaUrl } from "@/shared/configs/strapi-api.config"
import { contentUrl, IContent } from "@/shared/helpers/contentUrl"
import theme from '@/app/assets/theme';
import CustomSelectInput from '@/shared/ui/select-input/SelectValueInput';

const PickupCarForm: FC<{imageUrl: string}> = ({imageUrl}) => {
	const imgUrl = contentUrl.find((c: IContent) => c.slug === 'pickup-car-form')!.imgUrl
	const [transmission, setTransmission] = useState('')
	const [brand, setBrand] = useState('')
	const [body, setBody] = useState('')
	const [priceFrom, setPriceFrom] = useState('')
	const [priceTo, setPriceTo] = useState('')

	const handleChange = (event: SelectChangeEvent, field: string) => {
		if (field === 'transmission') setTransmission(event.target.value)
		else if (field === 'brand') setBrand(event.target.value)
		else setBody(event.target.value)
	}

	const CustomTextField = styled(TextField)(({ theme }) => ({
		"& .MuiInputBase-input": {
			backgroundColor: theme.palette.background.paper,
			height: '14px',
			borderRadius: 4,
			borderColor: "#80bdff",
			"&:focus": {
				borderColor: "#80bdff",
				boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
			},
		},
	}))

	const CustomButton = styled(Button)(() => ({
		color: '#fff',
		border: '1px solid #fff',
		opacity: .75,
		transition: '.5s all',
		'&:hover': {
			border: '1px solid #fff',
			opacity: 1
		},
	}))

	return (
		<Box
			sx={{
				display: 'flex',
				height: '450px',
				width: '100%',
				position: 'relative',
				borderRadius: '8px',
				mt: '5rem',
				mb: '5rem'
			}}
		>
			<Box
				sx={{
					display: 'flex',
					width: '100%',
					height: '100%',
				}}
			>
				<Box
					sx={{
						flex: 1,
						padding: '0 100px',
						position: 'absolute',
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						flexDirection: 'column',
						zIndex: 1,
						mt: '2rem',
					}}
				>
					<Box
						sx={{
							fontWeight: 700,
							color: 'white',
							fontSize: '24px',
							lineHeight: '140%',
						}}
					>Подобрать автомобиль</Box>
					<Box display='inline-flex' alignItems='center' sx={{ mt: '2rem', gap: 2 }}>
						<Box display='flex' flexDirection='column'>
							<CustomTextField
								required
								id="outlined-required"
								placeholder='Ваше имя'
							/>
						</Box>
						<Box display='flex' flexDirection='column'>
							<CustomTextField
								required
								id="outlined-required"
								placeholder='Номер телефона'
							/>
						</Box>
					</Box>
					<Box display='inline-flex' alignItems='center' sx={{ mt: '2rem', gap: 2 }}>
						<CustomButton variant="outlined" startIcon={<TaskAltIcon />}>
							Новый
						</CustomButton>
						<CustomButton variant="outlined" startIcon={<LayersIcon />}>
							С пробегом
						</CustomButton>
					</Box>
					<Box display='inline-flex' alignItems='center' sx={{ mt: '2rem', gap: 2 }}>
						<CustomSelectInput value={brand} onChange={(e) => handleChange(e, 'brand')} field='brand' title='Марка' />
						<CustomSelectInput value={transmission} onChange={(e) => handleChange(e, 'transmission')} field='transmission' title='Трансмиссия' />
						<CustomSelectInput value={body} onChange={(e) => handleChange(e, 'body')} field='body' title='Кузов' />
						<Box display='flex' flexDirection='column'>
							<small style={{ color: '#fff' }}>Цена от</small>
							<CustomTextField
								required
								id="outlined-required"
								placeholder='Цена от'
							/>
						</Box>
						<Box display='flex' flexDirection='column'>
							<small style={{ color: '#fff' }}>Цена до</small>
							<CustomTextField
								required
								id="outlined-required"
								placeholder='Цена до'
							/>
						</Box>
					</Box>
					<Box display='inline-flex' alignItems='center' sx={{ mt: '2rem' }}>
						<Box display='flex' flexDirection='column' alignItems='center'>
							<CustomButton
									sx={{
										backgroundColor: '#E2B979',
										border: 'none',
										mb: 1,
										'&:hover': {
											border: 'none',
											backgroundColor: '#E2B979'
										},
									}}
							>
								Подобрать
							</CustomButton>
							<small style={{ color: '#fff' }}>Нажимая на кнопку вы автоматически соглашаетесь с обработкой персональных данных компанией</small>
						</Box>
					</Box>
				</Box>
				<Box sx={{
					backgroundImage: `url(${getStrapiMediaUrl(imageUrl)})`,
					width: '100%',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center',
					backgroundSize: 'cover',
					opacity: '.9'
				}}></Box>
			</Box>
		</Box>
	)
}

export default PickupCarForm