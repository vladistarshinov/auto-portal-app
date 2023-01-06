import React from "react";
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
import { Link } from "react-router-dom";
import Message from "../ui/components/Message";
import { DateTimeFilter } from "../filters/DateTimeFilter.js";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled } from "@mui/material/styles";

const OrderProductTable = ({ order }) => {
  const isMobile = useMediaQuery("(max-width:500px)");

  const PushingLink = styled(Link)({
    color: "navy",
    textDecoration: "none",
  });

  return (
    <Grid md={9}>
      <List>
        <ListItem style={{ alignItems: "flex-start", flexDirection: "column" }}>
          <Grid display="inline-flex">
            <Typography sx={{ color: "grey" }}>
              Клиент: {order.user.name}{" "}
            </Typography>
            <PushingLink href={`mailto:${order.user.email}`}>
              ({order.user.email})
            </PushingLink>
          </Grid>
          <Grid display="inline-flex">
            <Typography sx={{ color: "grey" }}>
              Дата создания заказа:{" "}
            </Typography>
            {DateTimeFilter(order.createdAt)}
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
        <ListItem
          sx={{
            display: isMobile && "flex",
            justifyContent: isMobile && "center",
            flexDirection: isMobile && "column",
          }}
        >
          {order.orderItems.length === 0 ? (
            <Message>Заказ пуст</Message>
          ) : isMobile ? (
            order?.orderItems?.map((item, index) => (
              <TableContainer component={Paper} key={order._id}>
                <Table aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell>{index + 1}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Название</TableCell>
                      <TableCell>
                        <PushingLink to={`/product/${item.product}`}>
                          {item.name}
                        </PushingLink>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Кол-во</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Цена за шт.</TableCell>
                      <TableCell>${item.price}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Общая сумма</TableCell>
                      <TableCell>${item.quantity * item.price}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            ))
          ) : (
            <List>
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
                  {order.orderItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <img
                          style={{
                            width: "4.5rem",
                            height: "3rem",
                          }}
                          src={item.image}
                          alt={item.name}
                          fluid
                          rounded
                        />
                      </TableCell>
                      <TableCell>
                        <PushingLink to={`/product/${item.product}`}>
                          {item.name}
                        </PushingLink>
                      </TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>${item.price}</TableCell>
                      <TableCell>${item.quantity * item.price}</TableCell>
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
