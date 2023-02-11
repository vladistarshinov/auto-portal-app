import { Box, Grid, List, ListItem, Paper, Typography } from '@mui/material';
import { FC } from 'react';
import DevicesOtherIcon from "@mui/icons-material/DevicesOther";
import OrderProductTable from '@/widgets/order/OrderProductTable';
import OrderProductActionsStatus from '@/widgets/order/OrderProductActionStatus';

const Order: FC<{order: any}> = ({order}) => {
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
					</Grid>
				</Box>

			</Box>
		</>
	);
};

export default Order;