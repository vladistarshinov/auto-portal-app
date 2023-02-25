import { FC } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import styled from "@emotion/styled"
import { Box, Button, Card, CardContent, Container, Grid, IconButton, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';

import BreadCrumbs from "@/shared/ui/breadcrumbs/Breadcrumbs";
import SelectInput from "@/shared/ui/select-input/SelectInput";
import Cart from "@/entities/cart/ui/Cart";

const CartScreen: FC = () => {

	return (
		<Container maxWidth='xl' sx={{ mt: '3rem' }}>
			<BreadCrumbs
				navElements={[{ title: "Каталог" }, { title: "Корзина", url: "/cart" }]}
			/>
			<Typography variant="h4" style={{ padding: "1rem 0" }}>
				Корзина
			</Typography>
			<Cart />
		</Container>
	)
}

export default CartScreen
