import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import Loader from "../ui/components/Loader";
import Message from "../ui/components/Message";
import { DateFilter } from "../filters/DateTimeFilter.js";
import styled from "styled-components";

const MyOrderList = ({ loadingOrders, errorOrders, orders }) => {
  const TickIcon = styled.i`
    color: green;
  `;

  const DaggerIcon = styled.i`
    color: red;
  `;

  /*const orderList = [
    {
      _id: 1,
      createdAt: "2021-21-11",
      totalPrice: 1000,
      isPaid: true,
      paidAt: "2021-21-11",
      isDelivered: true,
      deliveredAt: "2021-21-11",
    },
    {
      _id: 2,
      createdAt: "2021-21-11",
      totalPrice: 2000,
      isPaid: true,
      paidAt: "2021-21-11",
    },
    {
      _id: 3,
      createdAt: "2021-21-11",
      totalPrice: 3000,
      isPaid: false,
    },
  ]; */

  return (
    <Grid md={9} lg={8}>
      <Typography style={{ padding: "1rem 0" }}>Мои заказы</Typography>
      {loadingOrders ? (
        <Loader />
      ) : errorOrders ? (
        <Message variant="error">{errorOrders}</Message>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow className="text-center">
                <TableCell align="center">Номер заказа</TableCell>
                <TableCell align="center">Дата</TableCell>
                <TableCell align="center">Сумма</TableCell>
                <TableCell align="center">Статус оплаты</TableCell>
                <TableCell align="center">Статус доставки</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow className="text-center" key={order._id}>
                  <TableCell align="center">{order._id}</TableCell>
                  <TableCell align="center">
                    {DateFilter(order.createdAt)}
                  </TableCell>
                  <TableCell align="center">${order.totalPrice}</TableCell>
                  <TableCell align="center">
                    {order.isPaid ? (
                      <>
                        <TickIcon className="fas fa-check"></TickIcon>
                        <br />
                        {/* <span>{order.paidAt.substring(0, 10)}</span> */}
                        <span>{DateFilter(order.paidAt)}</span>
                      </>
                    ) : (
                      <DaggerIcon className="fas fa-times"></DaggerIcon>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {order.isDelivered ? (
                      <>
                        <TickIcon className="fas fa-check"></TickIcon>
                        <br />
                        <span>{DateFilter(order.deliveredAt)}</span>
                      </>
                    ) : (
                      <DaggerIcon
                        className="fas fa-times"
                        style={{ color: "red" }}
                      ></DaggerIcon>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Link
                      style={{ color: "navy", textDecoration: "none" }}
                      to={`/order/${order._id}`}
                    >
                      <Button
                        type="button"
                        dark
                        className="btn-sm"
                        variant="light"
                      >
                        Подробнее
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Grid>
  );
};

export default MyOrderList;
