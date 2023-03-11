import { FC, useState } from "react"
import { motion } from 'framer-motion'
import { Box, Grid, IconButton } from "@mui/material"
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'

import { EnumAutoSort } from "@/entities/auto/model/auto.types"
import AutoCard from "@/entities/auto/ui/AutoCard"
import { useAutoListQuery } from '@/entities/auto/model/useAutoListQuery'
import { useAutoBrandsQuery } from '@/features/filter-cars-by-brand/model/useAutoBrandsQuery'
import CardSkeleton from '@/shared/ui/skeletons/CardSkeleton'
import SortSelectDropdown from "@/shared/ui/sort-select-input/SortSelectInput"
import LimitOnPagePlugin from '@/shared/ui/limit-on-page-plugin/LimitOnPagePlugin'
import PaginationWrapper from '@/shared/ui/pagination/Pagination'
import AutoBrands from '@/entities/auto-brands/AutoBrands'
import { FiltersDto } from '@/entities/auto/model/filters.dto'
import { IAuto, IAutoResponse } from "@/shared/api/types/auto.types"

const AutoList: FC<{cars: IAutoResponse, autoBrands: string[]}> = ({cars, autoBrands}) => {
	const [page, setPage] = useState(1)
	const [limit, setLimit] = useState(4)
	const [searchTerm, setSearchTerm] = useState('')
	const [filters, setFilters] = useState<FiltersDto | undefined>(undefined)

	const [sortType, setSortType] = useState<EnumAutoSort>(
		EnumAutoSort.NEW
	)

	const {autoList, isLoading} = useAutoListQuery(page, limit, searchTerm, sortType, filters, cars)

	const {brands, isBrandLoading} = useAutoBrandsQuery(autoBrands)

	if (isLoading) return <CardSkeleton />

	return (
		<>
			<Box display='flex' alignItems='center' justifyContent='space-between' gap={2}>
				<AutoBrands
					brands={brands}
					filters={filters}
					setFilters={setFilters}
					setPage={setPage}
					setLimit={setLimit}
				/>

				<Box display='flex' alignItems='center' justifyContent='space-between' gap={2}>
					<LimitOnPagePlugin limits={[4, 8]} limit={limit} setLimit={setLimit} />

					<SortSelectDropdown
						sortType={sortType}
						setSortType={setSortType}
					/>

					<IconButton aria-label="filter" size="small"
											onClick={() => setFilters(undefined)}
					>
						<FilterAltOffIcon />
					</IconButton>
				</Box>
			</Box>

			<motion.div layout>
				{autoList?.data?.map((car: IAuto) => (
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

			<PaginationWrapper<typeof autoList>
				list={autoList}
				page={page}
				setPage={setPage}
			/>
		</>
	)
}

export default AutoList