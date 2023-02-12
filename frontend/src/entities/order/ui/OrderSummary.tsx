import { FC } from "react"
import { Box, Grid, List, ListItem, Paper, Typography } from "@mui/material"

import OrderProductActionsStatus from "@/features/change-order-status/OrderProductActionStatus"

const OrderSummary: FC<{ order: any }> = ({order}) => {
	return (
		<Grid item xs={6} sm={6} md={3} lg={3}>
			<Paper>
				<List>
					<ListItem>
						<Typography variant="h6" style={{ color: "grey" }}>
							Расчетная сумма
						</Typography>
					</ListItem>
					<ListItem>
						<Grid>
							<Box>Товары</Box>
							<Box>${order.productsPrice}</Box>
						</Grid>
					</ListItem>
					<ListItem>
						<Grid>
							<Box>Доставка</Box>
							<Box>${order.shippingPrice}</Box>
						</Grid>
					</ListItem>
					<ListItem>
						<Grid>
							<Box>Налог</Box>
							<Box>${order.taxPrice}</Box>
						</Grid>
					</ListItem>
					<ListItem>
						<Grid>
							<Box>
								<strong>Итого</strong>
							</Box>
							<Box>
								<strong>${order.totalPrice}</strong>
							</Box>
						</Grid>
					</ListItem>
				</List>
			</Paper>
			<OrderProductActionsStatus
				order={order}
			/>
		</Grid>
	)
}

export default OrderSummary