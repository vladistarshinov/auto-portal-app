import BreadCrumbs from "@/shared/ui/breadcrumbs/Breadcrumbs";
import styled from "@emotion/styled";
import { Box, Button, Card, CardContent, Grid, IconButton, Typography } from "@mui/material";
import Link from "next/link";
import { FC } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import SelectInput from "@/shared/ui/select-input/SelectInput";
import { useRouter } from "next/router";
import { useAuth } from "@/shared/hooks/useAuth"
import { useCart } from "@/shared/hooks/useCart"
import Cart from "entities/cart/ui/Cart";

const CartScreen: FC = () => {

	return (
		<Box marginX={4}>
			<BreadCrumbs
				navElements={[{ title: "Каталог" }, { title: "Корзина", url: "/cart" }]}
			/>
			<Typography variant="h4" style={{ padding: "1rem 0" }}>
				Корзина
			</Typography>
			<Cart />
		</Box>
	);
};

export default CartScreen;
