import { FC } from 'react'
import Image from 'next/image'
import { Box, Card, CardActions, CardContent, Link, Typography } from '@mui/material'
import { genEndOfNoun } from '@/shared/libs/gen-end-of-noun'
import { motion } from 'framer-motion'

const AutoCard: FC<{car: any}> = ({car}) => {
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
						<Typography sx={{ ml: 2 }} variant="body2">
							{car.countInStock ? 'В наличии' : ''}
						</Typography>
					</Box>
					<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
						<Typography variant="h6" sx={{ textDecoration: 'line-through' }}>
							{car.oldPrice}₽
						</Typography>
						<Typography variant="h5">{car.price} RUB</Typography>
					</Box>
				</CardActions>
			</Card>
		</motion.div>
	)
}

export default AutoCard