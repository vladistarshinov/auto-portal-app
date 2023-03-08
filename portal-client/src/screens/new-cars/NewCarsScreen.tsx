import AutoCard from '@/entities/auto/ui/AutoCard'
import Heading from '@/shared/ui/heading/Heading'
import AutoList from '@/widgets/auto-list/AutoList'
import { Box, Chip, Container, Grid, Stack } from '@mui/material'
import { FC } from 'react'

const NewCarsScreen: FC<{cars: any}> = ({cars}) => {

	return (
		<Container maxWidth="xl">
			<Box sx={{ display: 'flex', justifyContent: 'center', mt: '1rem' }}>
				<Heading title='Все новые автомобили'></Heading>
			</Box>
			<AutoList cars={cars} />
		</Container>
	)
}

export default NewCarsScreen