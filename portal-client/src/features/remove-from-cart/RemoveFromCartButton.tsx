import { FC } from "react"
import { Button, IconButton } from "@mui/material"
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'

import { useActions } from "@/app/store/utils/useActions"

interface IRemoveFromCartProps {
	item: any
}

const RemoveFromCartButton: FC<IRemoveFromCartProps> = ({ item }) => {
	const { removeFromCart } = useActions()
	return (
		<IconButton
			color="inherit"
			onClick={() => removeFromCart({ id: item._id })}
		>
			<DeleteIcon color="error"></DeleteIcon>
		</IconButton>

	)
}

export default RemoveFromCartButton