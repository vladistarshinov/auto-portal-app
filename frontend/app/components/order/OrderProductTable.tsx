import React, { FC } from "react";
import Grid from "@mui/material/Grid";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled } from "@mui/material/styles";
import Link from "@mui/material/Link";
import { convertDate } from '../../utils/date-time-filter'
import Image from 'next/image';

const OrderProductTable: FC<{order: any}> = ({ order }) => {
	const isMobile = useMediaQuery("(max-width:500px)");

	const PushingLink = styled(Link)({
		color: "navy",
		textDecoration: "none",
	});

	return (
		<Grid item xs={6} sm={6} md={8} lg={8}>
			<List>
				<ListItem style={{ alignItems: "flex-start", flexDirection: "column" }}>
					<Grid display="inline-flex">
						<Typography sx={{ color: "grey" }}>
							Клиент: {order.user.firstName}{" "}{order.user.lastName}
						</Typography>
						<PushingLink href={`mailto:${order.user.email}`}>
							({order.user.email})
						</PushingLink>
					</Grid>
					<Grid display="inline-flex">
						<Typography sx={{ color: "grey" }}>
							Дата создания заказа:{" "}
						</Typography>
						{convertDate(order.createdAt)}
					</Grid>
					<Grid display="inline-flex">
						<Typography sx={{ color: "grey" }}>Адрес доставки: </Typography>
						{order.shippingAddress.country}, {order.shippingAddress.city},{" "}
						{order.shippingAddress.postalCode}, {order.shippingAddress.address}
					</Grid>
					<Grid display="inline-flex">
						<Typography sx={{ color: "grey" }}>Способ оплаты: </Typography>
						{order.paymentMethod}
					</Grid>
				</ListItem>
				<ListItem>
					{order.orderItems.length === 0 ? (
						<Typography>Заказ пуст</Typography>
					) : isMobile ? (
						order?.orderItems?.map((item: any, index: number) => (
							<TableContainer component={Paper} key={item.product._id}>
								<Table aria-label="simple table">
									<TableBody>
										<TableRow>
											<TableCell>#</TableCell>
											<TableCell>{index + 1}</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>Название</TableCell>
											<TableCell>
												<PushingLink href={`/product/${item.product._id}`}>
													{item.product.title}
												</PushingLink>
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>Кол-во</TableCell>
											<TableCell>{item.quantity}</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>Цена за шт.</TableCell>
											<TableCell>${item.product.price}</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>Общая сумма</TableCell>
											<TableCell>${item.quantity * item.product.price}</TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</TableContainer>
						))
					) : (
						<List sx={{ width: '90%' }}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>#</TableCell>
										<TableCell>Фото товара</TableCell>
										<TableCell>Название</TableCell>
										<TableCell>Кол-во</TableCell>
										<TableCell>Цена за шт.</TableCell>
										<TableCell>Общая сумма</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{order.orderItems.map((item: any, index: number) => (
										<TableRow key={index}>
											<TableCell>{index + 1}</TableCell>
											<TableCell sx={{ width: '4.5rem', height: '4.5rem', position: 'relative', margin: '1rem auto' }}>
												<Image
													layout='fill'
													draggable={false}
													priority
													src={item.product.imageUrl}
													alt={item.product.title}
												/>
											</TableCell>
											<TableCell>
												<PushingLink href={`/product/${item.product.slug}`}>
													{item.product.title}
												</PushingLink>
											</TableCell>
											<TableCell>{item.quantity}</TableCell>
											<TableCell>${item.product.price}</TableCell>
											<TableCell>${item.quantity * item.product.price}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</List>
					)}
				</ListItem>
			</List>
		</Grid>
	);
};

export default OrderProductTable;
