import { useQuery } from '@tanstack/react-query'
import { FC, useState, useMemo } from "react"
import { motion } from 'framer-motion'
import { Box, Button, Chip, Grid, Pagination, Skeleton, Stack, Typography } from "@mui/material"

import { AutoService } from "@/entities/auto/model/auto.service"
import { EnumAutoSort } from "@/entities/auto/model/auto.types"
import AutoCard from "@/entities/auto/ui/AutoCard"
import SortSelectDropdown from "@/shared/ui/sort-select-input/SortSelectInput"
import { AutoBrandService } from "@/features/filter-cars-by-brand/model/auto-brand.service"

const AutoList: FC<{cars: any, autoBrands: any}> = ({cars, autoBrands}) => {
	const [page, setPage] = useState(1)
	const [limit, setLimit] = useState(4)
	const [searchTerm, setSearchTerm] = useState('')
	const [filters, setFilters] = useState<any>(undefined)

	const [sortType, setSortType] = useState<EnumAutoSort>(
		EnumAutoSort.NEW
	)

	const { data: { data: autoList }, isLoading } = useQuery(
		['autos', page, limit, sortType],
		() =>
			AutoService.getAll(page, limit, searchTerm, sortType),
		{
			initialData: cars,
			keepPreviousData: true
		}
)

	const { data: { data: brands }, isLoading: isBrandLoading } = useQuery(
		['auto-brands'],
		() =>
			AutoBrandService.getAll(),
		{
			initialData: autoBrands,
			keepPreviousData: true
		}
	)

	const handleClick = (brand: string) => {
		setFilters({...filters, brand: brand})
	}

	return (
		<>
			<Box display='flex' alignItems='center' justifyContent='space-between' gap={2}>
				<Stack direction="row" alignItems='center' spacing={2}>
					{brands?.map((brand: string, idx: number) => (
						<Chip key={idx} label={brand} clickable onClick={() => handleClick(brand)}  />
					))}
					<small>+ Показать еще</small>
				</Stack>
				<Box display='flex' alignItems='center' gap={2}>
					<Typography>Показывать по:</Typography>
					<Button
						sx={{
							background: limit === 2 ? '#e0e0e0' : '',
							border: 'transparent'
						}}
						variant="outlined"
						size="small"
						color="inherit"
						onClick={() => setLimit(2)}
					>
						2
					</Button>
					<Button
						sx={{
							background: limit === 4 ? '#e0e0e0' : '',
							border: 'transparent'
						}}
						variant="outlined"
						size="small"
						color="inherit"
						onClick={() => setLimit(4)}
					>
						4
					</Button>
				</Box>
				<SortSelectDropdown
					sortType={sortType}
					setSortType={setSortType}
				/>
			</Box>
			{isLoading ? (
				<Box
					my={3}
					display='flex'
					alignItems='center'
					justifyContent='center'
					gap={4}
				>
					{Array
						.from(new Array(4))
						.map((_, idx) => (
							<Skeleton
								key={idx}
								variant='rectangular'
								width={450}
								height={300}
							/>
					))}
				</Box>
				) : (
				<motion.div layout>
					{autoList?.data?.map((car: any) => (
						<Grid
							item
							display="inline-grid"
							container
							direction="row"
							key={car._id}
							xs={12}
							sm={6}
							md={4}
							lg={3}
						>
							<AutoCard car={car} />
						</Grid>
					))}
				</motion.div>
			)}
			{autoList?.total > autoList?.per_page && (
				<Stack display='flex' justifyContent='center' spacing={2}>
					<Pagination
						count={Math.ceil(autoList?.total / autoList?.per_page)}
						page={page}
						onChange={(e: React.ChangeEvent<unknown>, value: number) => setPage(value)}
					/>
				</Stack>
			)}
		</>
	)
}

export default AutoList