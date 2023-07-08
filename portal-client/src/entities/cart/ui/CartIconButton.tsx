import {
	Link,
	IconButton,
	styled,
	Badge,
	BadgeProps
} from "@mui/material"

import {
	ShoppingCart as ShoppingCartIcon,
} from "@mui/icons-material"
import { useCart } from "../model/useCart"

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
	'& .MuiBadge-badge': {
		right: -3,
		top: 13,
		border: `2px solid ${theme.palette.background.paper}`,
		padding: '0 4px',
	},
}))

const CartIconButton = () => {
	const { cart: items } = useCart()
	return (
		<Link
			href="/cart"
			underline="none"
			color="text.primary"
			sx={{ display: "flex", my: { sm: 1, xs: 1 } }}
		>
			<IconButton aria-label="cart">
				<StyledBadge badgeContent={items?.length} color="secondary">
					<ShoppingCartIcon />
				</StyledBadge>
			</IconButton>
		</Link>
	)
}

export default CartIconButton