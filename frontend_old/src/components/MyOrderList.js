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
import useMediaQuery from "@mui/material/useMediaQuery";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

const MyOrderList = ({ loadingOrders, errorOrders, orders }) => {
  const isTablet = useMediaQuery("(max-width:745px)");
  return (
    <Grid>
      <Typography
        variant="h5"
        sx={{
          display: isTablet && "flex",
          justifyContent: isTablet && "center",
          my: isTablet && "1rem",
          padding: !isTablet && "1rem 0",
        }}
      >
        Мои заказы
      </Typography>
      {loadingOrders ? (
        <Loader />
      ) : errorOrders ? (
        <Message variant="error">{errorOrders}</Message>
      ) : isTablet ? (
        orders?.map((order) => (
          <TableContainer component={Paper} key={order._id}>
            <Table sx={{ minWidth: 300 }} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell align="center">Номер заказа</TableCell>
                  <TableCell align="center">{order._id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">Дата</TableCell>
                  <TableCell align="center">
                    {DateFilter(order.createdAt)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">Сумма</TableCell>
                  <TableCell align="center">${order.totalPrice}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">Статус оплаты</TableCell>
                  <TableCell align="center">
                    {order.isPaid ? (
                      <>
                        <DoneIcon color="success"></DoneIcon>
                        <br />
                        {/* <span>{order.paidAt.substring(0, 10)}</span> */}
                        <span>{DateFilter(order.paidAt)}</span>
                      </>
                    ) : (
                      <CloseIcon color="error"></CloseIcon>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">Статус доставки</TableCell>
                  <TableCell align="center">
                    {order.isDelivered ? (
                      <>
                        <DoneIcon color="success"></DoneIcon>
                        <br />
                        <span>{DateFilter(order.deliveredAt)}</span>
                      </>
                    ) : (
                      <CloseIcon color="error"></CloseIcon>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
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
              </TableBody>
            </Table>
          </TableContainer>
        ))
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
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
                <TableRow key={order._id}>
                  <TableCell align="center">{order._id}</TableCell>
                  <TableCell align="center">
                    {DateFilter(order.createdAt)}
                  </TableCell>
                  <TableCell align="center">${order.totalPrice}</TableCell>
                  <TableCell align="center">
                    {order.isPaid ? (
                      <>
                        <DoneIcon color="success"></DoneIcon>
                        <br />
                        {/* <span>{order.paidAt.substring(0, 10)}</span> */}
                        <span>{DateFilter(order.paidAt)}</span>
                      </>
                    ) : (
                      <CloseIcon color="error"></CloseIcon>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {order.isDelivered ? (
                      <>
                        <DoneIcon color="success"></DoneIcon>
                        <br />
                        <span>{DateFilter(order.deliveredAt)}</span>
                      </>
                    ) : (
                      <CloseIcon color="error"></CloseIcon>
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
