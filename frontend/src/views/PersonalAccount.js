import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {
  getUserProfile,
  updateUserProfile,
} from "../redux/actions/user.actions";
import { listOfMyOrders } from "../redux/actions/order.actions";
import Loader from "../ui/components/Loader";
import Message from "../ui/components/Message";
import MyOrderList from "../components/MyOrderList";
import ChangePasswordModal from "../components/modals/ChangePasswordModal";

const Profile = ({ history, location }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.userProfile);
  const { loading, error, userDetails } = userProfile;
  console.log(userDetails);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const updatingUserProfile = useSelector((state) => state.updatingUserProfile);
  const { success } = updatingUserProfile;

  const myOrderList = useSelector((state) => state.myOrderList);
  const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (userDetails === undefined || !userDetails.name) {
        dispatch(getUserProfile("profile"));
        dispatch(listOfMyOrders());
      } else {
        setName(userDetails.name);
        setEmail(userDetails.email);
      }
    }
  }, [dispatch, history, userInfo, userDetails]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUserProfile({
        id: userDetails._id,
        name,
        email,
        isAdmin: userDetails?.isAdmin,
      })
    );
    dispatch(getUserProfile("profile"));
  };

  return (
    <Grid container display="inline-flex" justifyContent="space-around" mt={2}>
      <Grid item lg={3} md={3} sm={6} mr={2}>
        {/* <h2 id="accordionExample">Профиль</h2> */}
        <Card>
          <CardContent>
            <Typography sx={{ my: 1 }} variant="h5">
              Профиль
            </Typography>
            {message && <Message variant="error">{message}</Message>}
            {success && <Message variant="success">Профиль изменен</Message>}
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="error">{error}</Message>
            ) : (
              <Box display="flex" flexDirection="column">
                <FormControl>
                  <TextField
                    id="outlined-basic"
                    sx={{ my: 1 }}
                    type="name"
                    placeholder="Введите имя"
                    label="Имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <TextField
                    id="outlined-basic"
                    type="email"
                    sx={{ my: 1 }}
                    placeholder="Введите email"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <Box display="flex" flexDirection="column">
                  <Button
                    variant="outlined"
                    color="inherit"
                    sx={{ my: 1 }}
                    onClick={() => setOpen(true)}
                  >
                    Изменить пароль
                  </Button>
                  <Button
                    variant="outlined"
                    color="inherit"
                    sx={{ my: 1 }}
                    onClick={submitHandler}
                  >
                    Обновить
                  </Button>
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
        {/* */}
      </Grid>
      <ChangePasswordModal
        open={open}
        setOpen={(bool) => setOpen(bool)}
        detailId={userDetails._id}
      />
      <MyOrderList
        loadingOrders={loadingOrders}
        errorOrders={errorOrders}
        orders={orders}
      />
    </Grid>
  );
};

export default Profile;
