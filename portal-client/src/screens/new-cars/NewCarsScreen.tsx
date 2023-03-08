import AutoCard from '@/entities/auto/ui/AutoCard'
import Heading from '@/shared/ui/heading/Heading'
import { Box, Chip, Container, Grid, Stack } from '@mui/material'
import { FC } from 'react'

const NewCarsScreen: FC<{cars: any}> = ({cars}) => {
	return (
		<Container maxWidth="xl">
			<Box sx={{ display: 'flex', justifyContent: 'center', mt: '1rem' }}>
				<Heading title='Все новые автомобили'></Heading>
			</Box>
			<Stack direction="row" alignItems='center' spacing={2}>
				<Chip label="Volkswagen"  />
				<Chip label="Clickable" variant="outlined"  />
				<small>+ Показать еще</small>
			</Stack>
			<Box>
				{cars?.data?.map((car: any) => (
					<Grid
						item
						display="inline-grid"
						container
						direction="row"
						key={car._id}
						xs={12}
						sm={6}
						md={6}
						lg={4}
					>
						<AutoCard car={car} />
					</Grid>
				))}
			</Box>
		</Container>
	)
}

export default NewCarsScreen