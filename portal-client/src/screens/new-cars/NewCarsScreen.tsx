import AutoCard from '@/entities/auto/ui/AutoCard'
import { IAutoResponse } from '@/shared/api/types/auto.types'
import Heading from '@/shared/ui/heading/Heading'
import AutoList from '@/widgets/auto-list/AutoList'
import { Box, Chip, Container, Grid, Stack } from '@mui/material'
import { FC } from 'react'

const NewCarsScreen: FC<{cars: IAutoResponse, autoBrands: string[]}> = ({cars, autoBrands}) => {

	return (
		<Container maxWidth="xl">
			<Box sx={{ display: 'flex', justifyContent: 'center', mt: '1rem' }}>
				<Heading title='Все новые автомобили'></Heading>
			</Box>
			<AutoList cars={cars} autoBrands={autoBrands} />
		</Container>
	)
}

export default NewCarsScreen