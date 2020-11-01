import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Table, Modal, Button } from "bootstrap-4-react";
import { Form } from 'react-bootstrap';
import {
  listOfUsers,
  updateUser,
  removeUser,
} from "../redux/actions/admin.actions";
import { USER_UPDATE_RESET } from "../redux/constants/admin.constants";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";

const AdminUsersList = ({ history }) => {
  const dispatch = useDispatch();

  const usersList = useSelector((state) => state.usersList);
  const { loading, error, userList } = usersList;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdateUser,
    error: errorUpdateUser,
    success: successUpdateUser
  } = userUpdate;

  const userRemove = useSelector((state) => state.userRemove);
  const { success } = userRemove;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (successUpdateUser) {
        dispatch({ type: USER_UPDATE_RESET });
    }
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOfUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, successUpdateUser, userInfo]);

  const editHandler = (userId) => {
    const user = userList.find((user) => user._id == userId);
    setName(user.name);
    setEmail(user.email);
    setIsAdmin(user.isAdmin);
    setId(user._id);
  };

  // Решение для изменения чекбокса (не работает как у input через e.target.value)
  const soldCheckbox = (e) => {
    let { checked } = e.target;
    if (checked == true) {
      checked = true;
    } else {
      checked = false;
    }
    setIsAdmin(checked);
  };

  const submitUserUpdateHandler = () => {
    dispatch(updateUser({ _id: id, name, email, isAdmin }));
  };

  const deleteHandler = (id) => {
    if (window.confirm("Вы действительно хотите удалить пользователя?")) {
      dispatch(removeUser(id));
    }
  };

  return (
    <>
      <h2>Список пользователей</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table className="table-sm" striped bordered hover responsive>
            <thead>
              <tr className="text-center">
                <th>#</th>
                <th>Имя пользователя</th>
                <th>Email</th>
                <th>Статус администратора</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user) => (
                <tr className="text-center" key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a
                      href={`mailto:${user.email}`}
                      style={{ color: "navy", textDecoration: "none" }}
                    >
                      {user.email}
                    </a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i
                        className="fas fa-check"
                        style={{ color: "green" }}
                      ></i>
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <Button
                      className="btn-sm"
                      onClick={() => editHandler(user._id)}
                      warning
                      data-toggle="modal"
                      data-target="#editModal"
                      style={{ marginRight: "0.5rem" }}
                    >
                      <i className="fas fa-edit"></i>
                    </Button>
                    <Button
                      className="btn-sm"
                      danger
                      onClick={() => deleteHandler(user._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* Modal */}
          <Modal id="editModal" fade>
            <Modal.Dialog>
              <Modal.Content>
                <Modal.Header>
                  <Modal.Title>Изменение данных пользователя</Modal.Title>
                  <Modal.Close>
                    <span aria-hidden="true">&times;</span>
                  </Modal.Close>
                </Modal.Header>
                {loadingUpdateUser && <Loader />}
                {errorUpdateUser && <Message variant="danger">{errorUpdateUser}</Message>}
                {loading ? (
                    <Loader />
                  ) : error ? (
                    <Message variant="danger">{error}</Message>
                  ) : (
                    <FormContainer>
                      <Form onSubmit={submitUserUpdateHandler}>
                        <Modal.Body>
                            <Form.Group>
                                <label>Имя</label>
                                <Form.Control
                                    type="name"
                                    id="nameForm"
                                    placeholder="Введите имя и фамилию"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <label>E-mail</label>
                                <Form.Control
                                    type="email"
                                    id="emailForm"
                                    placeholder="Введите email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                              <label>Админ</label>
                              <Form.Control
                                as="select"
                                value={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.value)}
                                id="adminForm"
                                custom
                              >
                                <option value="true">да</option>
                                <option value="false">нет</option>
                              </Form.Control>
                            </Form.Group>
                            <Button secondary data-dismiss="modal" style={{ marginRight: '0.3rem' }}>
                                Закрыть
                            </Button>
                            <Button type="submit" dark>Обновить</Button>
                          </Modal.Body>
                        </Form>
                    </FormContainer>
                  )}
              </Modal.Content>
            </Modal.Dialog>
          </Modal>
        </>
      )}
    </>
  );
};

export default AdminUsersList;
