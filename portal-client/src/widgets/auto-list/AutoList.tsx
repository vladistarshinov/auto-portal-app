import { useQuery } from '@tanstack/react-query'
import { FC, useState } from "react"
import { motion } from 'framer-motion'
import { Box, Button, Chip, Grid, IconButton, Pagination, Skeleton, Stack, Typography } from "@mui/material"

import { AutoService } from "@/entities/auto/model/auto.service"
import { EnumAutoSort } from "@/entities/auto/model/auto.types"
import AutoCard from "@/entities/auto/ui/AutoCard"
import SortSelectDropdown from "@/shared/ui/sort-select-input/SortSelectInput"
import { AutoBrandService } from "@/features/filter-cars-by-brand/model/auto-brand.service"
import CardSkeleton from '@/shared/ui/skeletons/CardSkeleton'
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import { useAutoListQuery } from '@/entities/auto/model/useAutoListQuery'
import { useAutoBrandsQuery } from '@/features/filter-cars-by-brand/model/useAutoBrandsQuery'

const AutoList: FC<{cars: any, autoBrands: any}> = ({cars, autoBrands}) => {
	const [page, setPage] = useState(1)
	const [limit, setLimit] = useState(4)
	const [searchTerm, setSearchTerm] = useState('')
	const [filters, setFilters] = useState<any>(undefined)

	const [sortType, setSortType] = useState<EnumAutoSort>(
		EnumAutoSort.NEW
	)
/*
	const { data: { data: autoList }, isLoading } = useQuery(
		['autos', page, limit, sortType, filters],
		() =>
			AutoService.getAll(page, limit, searchTerm, sortType, filters),
		{
			initialData: cars,
			keepPreviousData: true
		}
	)
*/
	const {autoList, isLoading} = useAutoListQuery(page, limit, searchTerm, sortType, filters, cars)
/*
	const { data: { data: brands }, isLoading: isBrandLoading } = useQuery(
		['auto-brands'],
		() =>
			AutoBrandService.getAll(),
		{
			initialData: autoBrands,
			keepPreviousData: true
		}
	)
*/
	const {brands, isBrandLoading} = useAutoBrandsQuery(autoBrands)

	const handleClick = (brand: string) => {
		setPage(1)
		setLimit(10)
		setFilters({...filters, brand: brand})
	}

	if (isLoading) return <CardSkeleton />

	return (
		<>
			<Box display='flex' alignItems='center' justifyContent='space-between' gap={2}>
				<Stack direction="row" alignItems='center' spacing={2}>
					{brands?.slice(0, 5).map((brand: string, idx: number) => (
						<Chip sx={{ background: filters && filters.brand === brand ? '#b9b6b6' : '' }} key={idx} label={brand} clickable onClick={() => handleClick(brand)}  />
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
				<IconButton aria-label="filter" size="small"
					onClick={() => setFilters(undefined)}
				>
					<FilterAltOffIcon />
				</IconButton>
				<SortSelectDropdown
					sortType={sortType}
					setSortType={setSortType}
				/>
			</Box>
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