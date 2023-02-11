import Heading from "@/shared/ui/heading/Heading"
import Rating from "@/shared/ui/rating/Rating"
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
import SelectInput from "@/shared/ui/select-input/SelectInput"
import axios from "axios"
import { FC, useState } from "react"
import { useActions } from "@/shared/hooks/useActions"
import AddToCartButton from "@/features/add-to-cart/AddToCartButton"
import { useAuth } from "@/processes/auth/model/hooks/useAuth"
import { useCart } from "@/entities/cart/model/useCart"
import ProductDetail from "@/entities/product/ui/ProductDetail"
import ReviewList from "@/widgets/review-list/ReviewList"

const ProductScreen: FC<{product: any}> = ({product}) => {
	const {user} = useAuth()
	const ReviewsCount = styled(Box)({
		marginLeft: "0.25rem",
	});

	return (
		<Box sx={{ mx: 5 }}>
			<Heading title={product.name} />
			<ProductDetail product={product} />
			<ReviewList product={product} />
		</Box>
	)
}

export default ProductScreen