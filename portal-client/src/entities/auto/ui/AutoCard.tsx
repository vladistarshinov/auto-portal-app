import { FC } from 'react'
import Image from 'next/image'
import { Box, Button, Card, CardActions, CardContent, Link, Typography } from '@mui/material'
import { genEndOfNoun } from '@/shared/libs/gen-end-of-noun'
import { motion } from 'framer-motion'
import { IAuto } from '@/shared/api/types/auto.types'

const AutoCard: FC<{car: IAuto}> = ({car}) => {
	return (
		<motion.div
			layout
			animate={{ opacity: 1, scale: 1 }}
			initial={{ opacity: 0 }}
			exit={{ opacity: 0, scale: 0 }}
		>
			<Card sx={{ my: 3, mx: 2, cursor: 'pointer' }}>
				<Link href={`/new-cars/${car.slug}`}>
					<Box sx={{ width: '100%', height: '230px', position: 'relative' }}>
						<Image
							layout='fill'
							draggable={false}
							priority
							src={car.imageUrl}
							alt={car.title}
						/>
					</Box>
				</Link>
				<CardContent
					sx={{
						padding: "6px",
						height: "40px",
					}}
				>
					<Typography
						sx={{ textAlign: "center", fontSize: '20px' }}
						variant="h4"
						color="text.muted"
					>
						{car.title}
					</Typography>
				</CardContent>
				<CardActions sx={{ flexDirection: "column" }} disableSpacing>
					<Box display="inline-flex" alignItems="center">
							<Typography sx={{ ml: 2 }} variant="body1">
								{car.characteristics.mileage} км,
								{car.characteristics.year} г.в.,
								{car.characteristics.transmission},
								{car.characteristics.engineType},
								{car.characteristics.enginePower} л.с.
							</Typography>
					</Box>
					<Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '1rem', mt: 2 }}>
						<Box>
							<Typography variant="h5">{car.price} ₽</Typography>
						</Box>
						<Box>
							<Typography variant="h6" sx={{ textDecoration: 'line-through' }}>
								{car.oldPrice} ₽
							</Typography>
						</Box>
					</Box>
					<Box>
						<Button
							sx={{ mt: 2, mb: 1 }}
							variant="outlined"
							color="inherit"
							onClick={() => {}}
						>
							Оставить заявку
						</Button>
					</Box>
				</CardActions>
			</Card>
		</motion.div>
	)
}

export default AutoCard