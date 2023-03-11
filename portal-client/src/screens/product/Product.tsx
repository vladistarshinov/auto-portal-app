import { FC, useState } from "react"
import {
	Box,
	Button,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemText,
	Paper,
	styled,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Typography
} from "@mui/material"

import Heading from "@/shared/ui/heading/Heading"
import Rating from "@/shared/ui/rating/Rating"
import SelectInput from "@/shared/ui/select-input/SelectInput"
import { IProductDetailResponse } from "@/shared/api/types/product.types"
import AddToCartButton from "@/features/add-to-cart/AddToCartButton"
import ProductDetail from "@/entities/product/ui/ProductDetail"
import ReviewList from "@/widgets/review-list/ReviewList"
import { useAuth } from "@/processes/auth/model/hooks/useAuth"
import { useCart } from "@/entities/cart/model/useCart"
import BreadCrumbs from "@/shared/ui/breadcrumbs/Breadcrumbs"

const ProductScreen: FC<{ product: IProductDetailResponse }> = ({product}) => {
	const {user} = useAuth()
	const ReviewsCount = styled(Box)({
		marginLeft: "0.25rem",
	})

	return (
		<Box sx={{ mx: 5, mt: '1rem' }}>
			<BreadCrumbs
				navElements={[
					{ title: "Главная", url: '/' },
					{ title: "Каталог автозапчастей", url: '/autoparts' },
					{ title: product?.title }
				]}
			/>
			<ProductDetail product={product} />
			<ReviewList product={product} />
		</Box>
	)
}

export default ProductScreen