import { useActions } from "@/shared/hooks/useActions"
import { Button, IconButton } from "@mui/material"
import { FC } from "react"
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

interface IAddToCartProps {
	item: any
	quantity : number
}

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