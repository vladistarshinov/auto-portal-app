import React from "react";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Link } from "react-router-dom";
import Message from "../ui/components/Message";
import { DateTimeFilter } from "../filters/DateTimeFilter.js";
import styled from "styled-components";

const OrderProductTable = ({ order }) => {
  const TitleData = styled.strong`
    color: grey;
  `;

  const EmailAddress = styled.a`
    color: navy;
    text-decoration: none;
  `;

  const FigureImage = {
    width: "4.5rem",
    height: "3rem",
  };

  const ProductName = {
    color: "navy",
    textDecoration: "none",
  };

  return (
    <Grid md={9}>
      <List>
        <ListItem style={{ alignItems: "flex-start", flexDirection: "column" }}>
          <Grid>
            <TitleData>Клиент: {order.user.name} </TitleData>
            <EmailAddress href={`mailto:${order.user.email}`}>
              ({order.user.email})
            </EmailAddress>
          </Grid>
          <Grid>
            <TitleData>Дата создания заказа: </TitleData>
            {DateTimeFilter(order.createdAt)}
          </Grid>
          <Grid>
            <TitleData>Адрес доставки: </TitleData>
            {order.shippingAddress.country}, {order.shippingAddress.city},{" "}
            {order.shippingAddress.postalCode}, {order.shippingAddress.address}
          </Grid>
          <Grid>
            <TitleData>Способ оплаты: </TitleData>
            {order.paymentMethod}
          </Grid>
        </ListItem>
        <ListItem>
          {order.orderItems.length === 0 ? (
            <Message>Заказ пуст</Message>
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
                          style={FigureImage}
                          src={item.image}
                          alt={item.name}
                          fluid
                          rounded
                        />
                      </TableCell>
                      <TableCell>
                        <Link
                          style={ProductName}
                          to={`/product/${item.product}`}
                        >
                          {item.name}
                        </Link>
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
