import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap-4-react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Form } from "react-bootstrap";
import {
  listOfUsers,
  updateUser,
  removeUser,
} from "../redux/actions/admin.actions";
import { USER_UPDATE_RESET } from "../redux/constants/admin.constants";
import FormContainer from "../components/FormContainer";
import Loader from "../ui/components/Loader";
import Message from "../ui/components/Message";
import styled from "styled-components";
import EditUserModal from "../components/modals/EditUserModal";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";

const AdminUsersList = ({ history }) => {
  const dispatch = useDispatch();
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
  const { success } = userRemove;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (successUpdateUser) {
      dispatch({ type: USER_UPDATE_RESET });
    }
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOfUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, successUpdateUser, userInfo, success]);

  const editUserHandler = (userId) => {
    setOpenModal(true);
    const user = userList.find((user) => user._id == userId);
    setUserData({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
    setName(user.name);
    setEmail(user.email);
    setIsAdmin(user.isAdmin);
    setId(user._id);
  };

  const submitUserUpdateHandler = () => {
    dispatch(updateUser(userData));
  };

  const deleteUserHandler = (id) => {
    if (window.confirm("Вы действительно хотите удалить пользователя?")) {
      dispatch(removeUser(id));
    }
  };

  const Title = styled.h2`
    padding: 1rem 0;
  `;

  const TickIcon = styled.i`
    color: green;
  `;

  const DaggerIcon = styled.i`
    color: red;
  `;

  const EmailLink = styled.a`
    color: navy,
    textDecoration: none
  `;

  const ModalDialog = {
    maxWidth: "50vw",
  };

  const CenterLayout = {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  };

  return (
    <>
      {success && <Message variant="success">Пользователь удален</Message>}
      <Title>Список пользователей</Title>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : (
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow className="text-center">
                  <TableCell align="center">#</TableCell>
                  <TableCell align="center">Имя пользователя</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Статус администратора</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userList.map((user) => (
                  <TableRow className="text-center" key={user._id}>
                    <TableCell align="center">{user._id}</TableCell>
                    <TableCell align="center">{user.name}</TableCell>
                    <TableCell align="center">
                      <EmailLink
                        href={`mailto:${user.email}`}
                        style={{ color: "navy", textDecoration: "none" }}
                      >
                        {user.email}
                      </EmailLink>
                    </TableCell>
                    <TableCell align="center">
                      {user.isAdmin ? (
                        <TickIcon className="fas fa-check"></TickIcon>
                      ) : (
                        <DaggerIcon className="fas fa-times"></DaggerIcon>
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
          <EditUserModal
            open={openModal}
            setOpen={(bool) => setOpenModal(bool)}
            userData={userData}
            setUserData={setUserData}
            action={() => submitUserUpdateHandler()}
          />
        </>
      )}
    </>
  );
};

export default AdminUsersList;
