import { FC, useState } from 'react'
import {
	Stack,
	Container,
	Button,
	Menu,
	MenuItem,
	Link,
	Box,
} from "@mui/material"
import {
	ArrowDropDown as ArrowDropDownIcon,
	CarRepairOutlined as CarRepairOutlinedIcon
} from "@mui/icons-material"

import HeaderMenu from "@/shared/ui/menu/HeaderMenu"
import CartIconButton from '@/entities/cart/ui/CartIconButton'

const Header: FC = () => {
	const [anchorCategoryEl, setAnchorCategoryEl] = useState(null)
	const openCategory = Boolean(anchorCategoryEl)

	const handleCategoryClick = (event: any) => {
		setAnchorCategoryEl(event.currentTarget)
	}

	const handleCategoryClose = () => {
		setAnchorCategoryEl(null)
	}

	return (
		<Stack sx={{
			bgcolor: "#f8f9fa",
			p: 1,
			boxShadow: '0px 2px 12px -3px rgba(0, 0, 0, 0.25)',
			position: 'fixed',
			width: '100%',
			zIndex: 10
		}}>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-around",
					flexDirection: { md: "row", sm: "column", xs: "column" },
				}}
			>
				<Link
					href="/"
					underline="none"
					color="text.primary"
					sx={{ display: "flex", alignItems: 'center', my: { sm: 1, xs: 1 } }}
				>
					<CarRepairOutlinedIcon sx={{ mr: 1, fontSize: 40 }} />
					<h3>Автоголд</h3>
				</Link>
				<Button
					sx={{
						color: "text.primary",
						"&:focus": {
							outline: "none",
							color: "inherit",
						},
						"&:hover": {
							bgcolor: "transparent",
							color: "#000",
						},
						my: { sm: 1, xs: 1 },
					}}
					id="basic-button"
					aria-controls={openCategory ? "basic-menu" : undefined}
					aria-haspopup="true"
					aria-expanded={openCategory ? "true" : undefined}
					onClick={handleCategoryClick}
				>
					Каталог
					<ArrowDropDownIcon />
				</Button>
				<Link sx={{ textDecoration: 'none', color: '#000' }} href="/blog">Новости и акции</Link>
				<Menu
					id="basic-menu"
					anchorEl={anchorCategoryEl}
					open={openCategory}
					onClose={handleCategoryClose}
					MenuListProps={{
						"aria-labelledby": "basic-button",
					}}
				>
					<MenuItem onClick={handleCategoryClose}>Новые автомобили</MenuItem>
					<MenuItem onClick={handleCategoryClose}>Автомобили с пробегом</MenuItem>
					<MenuItem onClick={handleCategoryClose}>Автозапчасти</MenuItem>
					<MenuItem onClick={handleCategoryClose}>Трейлеры</MenuItem>
				</Menu>
				<CartIconButton />
				<HeaderMenu />
			</Box>
		</Stack>
	)
}

export default Header
