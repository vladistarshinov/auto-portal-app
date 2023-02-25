import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import Box from "@mui/material/Box"

import Carousel from "@/shared/ui/carousel/Carousel"
import Heading from "@/shared/ui/heading/Heading"
import { IProduct } from '@/shared/api/types/product.types'

const TopProductsCarousel: FC<{ products: IProduct[] }> = ({products}) => {

	return (
		<>
			<Box sx={{ display: 'flex', justifyContent: 'center', mt: '1rem' }}>
				<Heading title='Топ популярных'></Heading>
			</Box>
			<Box
				display="flex"
				justifyContent="center"
				sx={{ background: "#f8f9fa", p: 2, width: '50%', margin: '1rem auto' }}
			>
				<Carousel products={products} />
			</Box>
		</>
	)
}

export default TopProductsCarousel