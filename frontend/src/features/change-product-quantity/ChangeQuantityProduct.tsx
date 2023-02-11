import { useActions } from "@/shared/hooks/useActions"
import { IconButton } from "@mui/material"
import { FC } from "react"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface IChangeQuantity {
	item: any
	type: 'plus' | 'minus'
}

const ChangeQuantityProductButton: FC<IChangeQuantity> = ({ item, type }) => {
	const { changeQuantity } = useActions()
	return (
		<IconButton aria-label={type} size="large" onClick={() => changeQuantity({ id: item._id, type: type  })}>
			{type === 'plus'? <AddIcon fontSize="inherit" /> : <RemoveIcon fontSize="inherit" />}
		</IconButton>
	)
}

export default ChangeQuantityProductButton