import {
	FC,
	Dispatch,
	SetStateAction,
} from 'react'
import { Chip, Stack } from "@mui/material"

import { FiltersDto } from "../auto/model/filters.dto"

interface IAutoBrands {
	brands?: string[]
	filters?: FiltersDto
	setFilters: Dispatch<SetStateAction<FiltersDto | undefined>>
	setPage: Dispatch<SetStateAction<number>>
	setLimit: Dispatch<SetStateAction<number>>
}
const AutoBrands: FC<IAutoBrands> = ({
		 brands,
		 filters,
		 setFilters,
		 setPage,
		 setLimit
	}) => {

	const handleClick = (brand: string) => {
		setPage(1)
		setLimit(10)
		setFilters({...filters, brand: brand})
	}
	
	return (
		<Stack direction="row" alignItems='center' spacing={2}>
			{brands?.slice(0, 5)?.map((brand: string, idx: number) => (
				<Chip
					sx={{
						background: filters && filters.brand === brand ? '#b9b6b6' : ''
					}}
					key={idx}
					label={brand}
					clickable
					onClick={() => handleClick(brand)}  />
			))}
			<small>+ Показать еще</small>
		</Stack>
	)
}

export default AutoBrands