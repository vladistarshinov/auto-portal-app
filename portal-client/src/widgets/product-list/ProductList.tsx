import { ChangeEvent, FC, useState } from "react"
import { motion } from "framer-motion"
import {
	Box,
	Grid,
	IconButton,
    TextField
} from "@mui/material"
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'

import ProductCard from "@/entities/product/ui/ProductCard"
import { IProduct, IProductsResponse } from "@/shared/api/types/product.types"
import { EnumAutoSort } from "@/entities/auto/model/auto.types"
import LimitOnPagePlugin from "@/shared/ui/limit-on-page-plugin/LimitOnPagePlugin"
import SortSelectDropdown from "@/shared/ui/sort-select-input/SortSelectInput"
import { useAutoPartsQuery } from "@/entities/product/model/useAutoPartsQuery"
import PaginationWrapper from "@/shared/ui/pagination/Pagination"
import { useDebounce } from "@/shared/hooks/useDebounce"

const ProductList: FC<{products: IProductsResponse}> = ({ products }) => {
	const [page, setPage] = useState(1)
	const [limit, setLimit] = useState(4)
	const [searchTerm, setSearchTerm] = useState('')
	const [filters, setFilters] = useState<any>(undefined)

	const [sortType, setSortType] = useState<EnumAutoSort>(
		EnumAutoSort.NEW
	)

	const debouncedSearch = useDebounce<string>(searchTerm, 500)

	const {productList, isLoading} = useAutoPartsQuery(page, limit, debouncedSearch, sortType, filters, products)
	return (
		<>
			<Box display='flex' alignItems='center' justifyContent='space-between' gap={2}>
				<Box>Фильтры</Box>
				<TextField
					placeholder="Поиск..."
					value={searchTerm}
					onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
				/>
				<Box display='flex' alignItems='center' justifyContent='space-between' gap={2}>
					<LimitOnPagePlugin limits={[1, 2]} limit={limit} setLimit={setLimit} />

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
				{productList?.data?.map((product: IProduct) => (
					<Grid
						item
						display="inline-grid"
						container
						direction="row"
						key={product._id}
						xs={12}
						sm={6}
						md={6}
						lg={4}
						xl={3}
					>
						<ProductCard product={product} />
					</Grid>
				))}
			</motion.div>

			<PaginationWrapper<typeof productList>
				list={productList}
				page={page}
				setPage={setPage}
			/>
		</>
	)
}

export default ProductList
