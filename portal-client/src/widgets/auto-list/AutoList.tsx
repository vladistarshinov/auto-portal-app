import { FC, useState } from "react"
import { motion } from 'framer-motion'
import { useQuery } from "@tanstack/react-query"
import { Box, Button, Chip, Grid, Pagination, Skeleton, Stack } from "@mui/material"

import { AutoService } from "@/entities/auto/model/auto.service"
import { EnumAutoSort } from "@/entities/auto/model/auto.types"
import AutoCard from "@/entities/auto/ui/AutoCard"
import SortSelectDropdown from "@/shared/ui/sort-select-input/SortSelectInput"

const AutoList: FC<{cars: any}> = ({cars}) => {
	const [page, setPage] = useState(1)
	const [limit, setLimit] = useState(4)
	const [searchTerm, setSearchTerm] = useState('')

	const [sortType, setSortType] = useState<EnumAutoSort>(
		EnumAutoSort.NEW
	)

	const { data: { data: res }, isLoading } = useQuery(
		['products', sortType, page],
		() =>
			AutoService.getAll(page, limit, searchTerm, sortType),
		{
			initialData: cars,
			keepPreviousData: true
		}
	)


	return (
		<>
			<Box display='flex' alignItems='center' justifyContent='space-between' gap={2}>
				<Stack direction="row" alignItems='center' spacing={2}>
					<Chip label="Volkswagen"  />
					<Chip label="Clickable" variant="outlined"  />
					<small>+ Показать еще</small>
				</Stack>
				<SortSelectDropdown sortType={sortType} setSortType={setSortType} />
			</Box>
			{isLoading ? (
				<Box my={3} display='flex' alignItems='center' justifyContent='center' gap={4}>
					{Array.from(new Array(4)).map((_, idx) => (
						<Skeleton key={idx} variant='rectangular' width={450} height={300} />
					))}
				</Box>
				) : (
				<motion.div layout>
					{res?.data?.map((car: any) => (
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
			{res?.total > res?.per_page && (
				<Stack display='flex' justifyContent='center' spacing={2}>
					<Pagination
						count={Math.ceil(res?.total / res?.per_page)}
						page={page}
						onChange={(e: React.ChangeEvent<unknown>, value: number) => setPage(value)}
					/>
				</Stack>
			)}
		</>
	)
}

export default AutoList