import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  listOfUsers,
  updateUser,
  removeUser,
} from "../redux/actions/admin.actions";
import { USER_UPDATE_RESET } from "../redux/constants/admin.constants";
import Loader from "../ui/components/Loader";
import Message from "../ui/components/Message";
import { styled } from "@mui/material/styles";
import EditUserModal from "../components/modals/EditUserModal";
import useMediaQuery from "@mui/material/useMediaQuery";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

const AdminUsersList = ({ history }) => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width:450px)");
  const isTablet = useMediaQuery("(max-width:750px)");
  const [openModal, setOpenModal] = useState(false);

  const usersList = useSelector((state) => state.usersList);
  const { loading, error, userList } = usersList;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdateUser,
    error: errorUpdateUser,
    success: successUpdateUser,
  } = userUpdate;

  const userRemove = useSelector((state) => state.userRemove);
  const {
    loading: loadingRemoveUser,
    success: successRemoveUser,
    error: errorRemoveUser,
  } = userRemove;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOfUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, successUpdateUser, successRemoveUser]);

  const editUserHandler = (userId) => {
    setOpenModal(true);
    const user = userList.find((user) => user._id == userId);
    setUserData({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  };

  const submitUserUpdateHandler = () => {
    dispatch(updateUser(userData));
  };

  const deleteUserHandler = (id) => {
    if (window.confirm("Вы действительно хотите удалить пользователя?")) {
      dispatch(removeUser(id));
    }
  };

  const PushingLink = styled(Link)({
    color: "navy",
    textDecoration: "none",
  });

  return (
    <>
      <Box sx={{ marginTop: "30px" }}>
        {successRemoveUser && (
          <Message variant="success">Пользователь удален</Message>
        )}
        {successUpdateUser && (
          <Message variant="success">Изменены данные пользователя</Message>
        )}
        {(loadingUpdateUser || loadingRemoveUser) && <Loader />}
        {(errorUpdateUser || errorRemoveUser) && (
          <Message variant="error">{error}</Message>
        )}
      </Box>
      <Typography variant="h5" sx={{ padding: "1rem 0" }}>
        Список пользователей
      </Typography>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : isTablet ? (
        userList.map((user, index) => (
          <TableContainer key={user._id} idx={index}>
            <Table sx={{ minWidth: 300 }}>
              <TableBody>
                <TableRow>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">
                    {isMobile ? index + 1 : user._id}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">
                    <PushingLink href={`mailto:${user.email}`}>
                      {user.email}
                    </PushingLink>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">Статус администратора</TableCell>
                  <TableCell align="center">
                    {user.isAdmin ? (
                      <DoneIcon color="success"></DoneIcon>
                    ) : (
                      <CloseIcon color="error"></CloseIcon>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">Действия</TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => editUserHandler(user._id)}
                      style={{ marginRight: "0.5rem" }}
                    >
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => deleteUserHandler(user._id)}>
                      <DeleteIcon color="secondary" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        ))
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow align="center">
                <TableCell align="center">#</TableCell>
                <TableCell align="center">Имя пользователя</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Статус администратора</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList.map((user) => (
                <TableRow align="center" key={user._id}>
                  <TableCell align="center">{user._id}</TableCell>
                  <TableCell align="center">{user.name}</TableCell>
                  <TableCell align="center">
                    <PushingLink href={`mailto:${user.email}`}>
                      {user.email}
                    </PushingLink>
                  </TableCell>
                  <TableCell align="center">
                    {user.isAdmin ? (
                      <DoneIcon color="success"></DoneIcon>
                    ) : (
                      <CloseIcon color="error"></CloseIcon>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => editUserHandler(user._id)}
                      style={{ marginRight: "0.5rem" }}
                    >
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => deleteUserHandler(user._id)}>
                      <DeleteIcon color="secondary" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <EditUserModal
        open={openModal}
        setOpen={(bool) => setOpenModal(bool)}
        userData={userData}
        setUserData={setUserData}
        action={() => submitUserUpdateHandler()}
      />
    </>
  );
};

export default AdminUsersList;
