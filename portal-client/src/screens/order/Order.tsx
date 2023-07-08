import { FC } from 'react'
import { Box, Grid, List, ListItem, Paper, Typography } from '@mui/material'
import DevicesOtherIcon from "@mui/icons-material/DevicesOther"

import OrderProductTable from '@/entities/order/ui/OrderProductTable'
import OrderSummary from '@/entities/order/ui/OrderSummary'

const OrderScreen: FC<{order: any}> = ({order}) => {
	return (
		<>
			<Box id="printOrder">
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						flexDirection: "column",
						color: "grey",
						marginTop: "20px",
					}}
				>
					<DevicesOtherIcon sx={{ fontSize: "2rem" }}></DevicesOtherIcon>
					<Typography>IGadgetShop</Typography>
					<Typography variant="h6" style={{ color: "grey" }}>
						Заказ № {order._id}
					</Typography>
				</Box>

				<Box>
					<Grid spacing={1} container>
						<OrderProductTable order={order} />
						<OrderSummary order={order} />
					</Grid>
				</Box>

			</Box>
		</>
	)
}

export default OrderScreen