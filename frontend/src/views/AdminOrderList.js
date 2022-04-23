import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
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
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

const AdminOrderList = ({ history }) => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width:450px)");
  const isTablet = useMediaQuery("(max-width:750px)");

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

  const LinkToOrderDetails = styled(Link)({
    color: "navy",
    textDecoration: "none",
  });

  return (
    <>
      <Grid className="align-items-center">
        <Box>
          <Typography variant="h5" sx={{ padding: "1rem 0" }}>
            Список заказов
          </Typography>
        </Box>
      </Grid>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : isTablet ? (
        ordersInfo?.map((order, index) => (
          <TableContainer key={order._id} idx={index}>
            <Table sx={{ minWidth: 300 }}>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">
                  {isMobile ? index + 1 : order._id}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">Клиент</TableCell>
                <TableCell align="center">
                  {order.user && order.user.name}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">Дата</TableCell>
                <TableCell align="center">
                  {DateFilter(order.createdAt)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">К оплате</TableCell>
                <TableCell align="center">${order.totalPrice}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">Статус оплаты</TableCell>
                <TableCell align="center">
                  {order.isPaid ? (
                    <>
                      <DoneIcon color="success"></DoneIcon>
                      <br />
                      {DateFilter(order.paidAt)}
                    </>
                  ) : (
                    <CloseIcon color="error"></CloseIcon>
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">Статус отправки</TableCell>
                <TableCell align="center">
                  {order.isDelivered ? (
                    <>
                      <DoneIcon color="success"></DoneIcon>
                      <br />
                      {DateFilter(order.deliveredAt)}
                    </>
                  ) : (
                    <CloseIcon color="error"></CloseIcon>
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">Подробнее</TableCell>
                <TableCell align="center">
                  <LinkToOrderDetails to={`/order/${order._id}`}>
                    <IconButton>
                      <ReadMoreIcon />
                    </IconButton>
                  </LinkToOrderDetails>
                </TableCell>
              </TableRow>
            </Table>
          </TableContainer>
        ))
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
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
                <TableRow key={order._id}>
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
                        <DoneIcon color="success"></DoneIcon>
                        <br />
                        {DateFilter(order.paidAt)}
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
                        {DateFilter(order.deliveredAt)}
                      </>
                    ) : (
                      <CloseIcon color="error"></CloseIcon>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <LinkToOrderDetails to={`/order/${order._id}`}>
                      <IconButton>
                        <ReadMoreIcon />
                      </IconButton>
                    </LinkToOrderDetails>
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
