import { FC } from "react"
import {
	Box,
	Grid
} from "@mui/material"

import Heading from "@/shared/ui/heading/Heading"
import ProductCard from "@/entities/product/ui/ProductCard"
import { IProduct, IProductsResponse } from "@/shared/api/types/product.types"

const ProductList: FC<{products: IProductsResponse}> = ({ products }) => {
	console.log(products);
	return (
		<>
			<Box sx={{ display: 'flex', justifyContent: 'center', mt: '1rem' }}>
				<Heading title='Все товары'></Heading>
			</Box>
			<Box>
				{products?.data?.map((product: IProduct) => (
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
			</Box>
		</>
	)
}

export default ProductList
