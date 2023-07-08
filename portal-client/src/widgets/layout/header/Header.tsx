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

import s from './Header.module.scss'

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
		<Stack className={s.stack}>
			<Box
				className={s.wrapper}
				sx={{
					flexDirection: { md: "row", sm: "column", xs: "column" },
				}}
			>
				<Link
					href="/"
					underline="none"
					color="text.primary"
					className={s.wrapper__link}
					sx={{ my: { sm: 1, xs: 1 } }}
				>
					<CarRepairOutlinedIcon className={s.wrapper__link__icon} />
					<h3>Автоголд</h3>
				</Link>
				<Button
					className={s.wrapper__catalog__btn}
					sx={{
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
				<Link className={s.wrapper__link__item} href="/news">Новости и акции</Link>
				<Menu
					id="basic-menu"
					anchorEl={anchorCategoryEl}
					open={openCategory}
					onClose={handleCategoryClose}
					MenuListProps={{
						"aria-labelledby": "basic-button",
					}}
				>
					<MenuItem onClick={handleCategoryClose}>
						<Link className={s.wrapper__link__item} href='/new-cars'>Новые автомобили</Link>
					</MenuItem>
					<MenuItem onClick={handleCategoryClose}>Автомобили с пробегом</MenuItem>
					<MenuItem onClick={handleCategoryClose}>
						<Link className={s.wrapper__link__item} href='/autoparts'>Автозапчасти</Link>
					</MenuItem>
					<MenuItem onClick={handleCategoryClose}>Трейлеры</MenuItem>
				</Menu>
				<CartIconButton />
				<HeaderMenu />
			</Box>
		</Stack>
	)
}

export default Header
