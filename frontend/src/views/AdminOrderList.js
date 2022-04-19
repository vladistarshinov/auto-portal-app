import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { listOfOrders } from "../redux/actions/admin.actions";
import Loader from "../ui/components/Loader";
import Message from "../ui/components/Message";
import { DateFilter } from "../filters/DateTimeFilter.js";
import styled from "styled-components";

const AdminOrderList = ({ history }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, ordersInfo, error } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOfOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  const Title = styled.h2`
    padding: 1rem 0;
  `;

  const TickIcon = styled.i`
    color: green;
  `;

  const DaggerIcon = styled.i`
    color: red;
  `;

  const LinkToOrderDetails = {
    color: "navy",
    textDecoration: "none",
  };

  return (
    <>
      <Grid className="align-items-center">
        <Box>
          <Title>Список заказов</Title>
        </Box>
      </Grid>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow className="text-center">
                <TableCell align="center">#</TableCell>
                <TableCell align="center">Клиент</TableCell>
                <TableCell align="center">Дата</TableCell>
                <TableCell align="center">К оплате</TableCell>
                <TableCell align="center">Статус оплаты</TableCell>
                <TableCell align="center">Статус отправки</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ordersInfo.map((order) => (
                <TableRow className="text-center" key={order._id}>
                  <TableCell align="center">{order._id}</TableCell>
                  <TableCell align="center">
                    {order.user && order.user.name}
                  </TableCell>
                  <TableCell align="center">
                    {DateFilter(order.createdAt)}
                  </TableCell>
                  <TableCell align="center">${order.totalPrice}</TableCell>
                  <TableCell align="center">
                    {order.isPaid ? (
                      <>
                        <TickIcon className="fas fa-check"></TickIcon>
                        <br />
                        {DateFilter(order.paidAt)}
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
                        {DateFilter(order.deliveredAt)}
                      </>
                    ) : (
                      <DaggerIcon className="fas fa-times"></DaggerIcon>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Link style={LinkToOrderDetails} to={`/order/${order._id}`}>
                      <IconButton>
                        <ReadMoreIcon />
                      </IconButton>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default AdminOrderList;
