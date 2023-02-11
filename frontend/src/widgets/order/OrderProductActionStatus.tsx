import { FC, useState } from "react";
import { Alert, Box, Button, Grid, List, ListItem, Paper, Typography } from "@mui/material";
import styled from "@emotion/styled";

import { convertDate } from "@/shared/libs/date-time-filter";
import PrintInvoiceButton from "features/print-invoice/PrintInvoiceButton";
import { useAuth } from "@/shared/hooks/useAuth";

const OrderProductActionsStatus: FC<{ order: any }> = ({ order }) => {
	const { user } = useAuth();

	const [sdkPayPalReady, setSdkPayPalReady] = useState(false);

	/*useEffect(() => {
		if (!order || successPayingProcess || successDeliveringProcess) {
			dispatch({ type: ORDER_UPDATE_STATUS_FOR_PAYING_RESET });
			dispatch({ type: ORDER_DELIVER_RESET });
			dispatch(getOrderDetails(orderId));
		} else if (!order.isPaid) {
			if (!window.paypal) {
				addPayPalScript(setSdkPayPalReady);
			} else {
				setSdkPayPalReady(true);
			}
		}
	}, [
		dispatch,
		successPayingProcess,
		successDeliveringProcess,
		orderId,
		order,
	]);
	*/


	const successPaymentHandler = (paymentResult: any) => {
		console.log(paymentResult);
		//dispatch(updateStatusPayingOrder(orderId, paymentResult));
	};

	const payingActionHandler = () => {

	}

	const deliverHandler = () => {
		//dispatch(updateStatusDeliveringOrder(order));
	};

	const StatusMessage = styled(Box)({
		display: "flex",
		justifyContent: "center",
		maxWidth: "250px",
		paddingTop: "0.9rem",
		marginBottom: "1rem",

		"&:last-child": {
			paddingTop: 0,
		},
	});

	return (
		<>
			<Paper>
				<List>
					{!order.isPaid && (
						<ListItem id="payingButtonElements" style={{ display: "none" }}>
							<Box>
								<Grid>
									Paying
								</Grid>
							</Box>
						</ListItem>
					)}
				</List>
			</Paper>
			<StatusMessage>
				{order.isPaid ? (
					<Alert severity="success">
						Оплачено
						<br />
						{convertDate(order.paidAt)}
					</Alert>
				) : (
					<Box display='flex' flexWrap='wrap'>
						<Alert severity="error">Не оплачено</Alert>
						<PrintInvoiceButton order={order}></PrintInvoiceButton>
					</Box>
				)}
			</StatusMessage>
			<StatusMessage>
				{order.isPaid &&
					(order.isDelivered ? (
						<Alert severity="success">
							Отправлено
							<br />
							{convertDate(order.deliveredAt)}
						</Alert>
					) : (
						<Alert severity="error">Не отправлено</Alert>
					))}
			</StatusMessage>
			{user && user.isAdmin && order.isPaid && !order.isDelivered && (
				<Box display="flex" justifyContent="center">
					<Button variant="outlined" onClick={deliverHandler}>
						Отправить
					</Button>
				</Box>
			)}
			{!order.isPaid && (
				<Box display="flex" justifyContent="center">
					<Button
						variant="outlined"
						color="inherit"
						onClick={payingActionHandler}
						sx={{ mb: "1rem" }}
					>
						Оплатить
					</Button>
				</Box>
			)}
		</>
	);
};

export default OrderProductActionsStatus;
