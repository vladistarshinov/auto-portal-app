import { Box, Button, Typography } from "@mui/material"
import { Dispatch, FC, SetStateAction } from "react"

interface ILimitOnPage {
	limits: number[]
	limit: number
	setLimit: Dispatch<SetStateAction<number>>
}

const LimitOnPagePlugin: FC<ILimitOnPage> = ({limits, limit, setLimit}) => {
	return (
		<Box display='flex' alignItems='center' gap={2}>
			<Typography>Показывать по:</Typography>
			{limits.map((l: number) => (
				<Button
					sx={{
						background: limit === l ? '#e0e0e0' : '',
						border: 'transparent'
					}}
					variant="outlined"
					size="small"
					color="inherit"
					onClick={() => setLimit(l)}
				>
					{l}
				</Button>
			))}
		</Box>
	)
}

export default LimitOnPagePlugin