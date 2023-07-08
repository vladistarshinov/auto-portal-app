import { FC } from "react"
import { Button, IconButton } from "@mui/material"
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'

import { useActions } from "@/app/store/utils/useActions"
import { IProductDetailResponse } from "@/shared/api/types/product.types"

interface IAddToCartProps {
	item: IProductDetailResponse
	quantity : number
}
 /*
	TODO: Убрать из item лишние данные
 */
const AddToCartButton: FC<IAddToCartProps> = ({ item, quantity }) => {
	const { addToCart } = useActions()
	return (
		<Button
			variant="outlined"
			color="inherit"
			onClick={() => addToCart({
				product: item,
				quantity,
			})}
		>
			Добавить в корзину
		</Button>
	)
}

export default AddToCartButton