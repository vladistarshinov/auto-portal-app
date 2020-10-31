import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Table, Modal, Form, Button } from "bootstrap-4-react";
import { listOfUsers, removeUser } from "../redux/actions/admin.actions";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";

const AdminUsersList = ({ history }) => {
  const dispatch = useDispatch();

  const usersList = useSelector((state) => state.usersList);
  const { loading, error, userList } = usersList;

  const userRemove = useSelector((state) => state.userRemove);
  const { success } = userRemove;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOfUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, success, userInfo]);

  const editHandler = (userId) => {
    const user = userList.find(user => user._id == userId);
    setName(user.name);
    setEmail(user.email);
    setIsAdmin(user.isAdmin);
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
                    {/* <LinkContainer to={`/admin/user/${user._id}/edit`} style={{ color: 'orange' }}> */}
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
                    {/* </LinkContainer> */}
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
                <Modal.Body>
                    {loading ? (
                        <Loader />
                    ) : error ? (
                        <Message variant="danger">{error}</Message>
                    ) : (
                        <FormContainer>
                            <Form>
                                <Form.Group>
                                    <label htmlFor="nameForm">Имя</label>
                                    <Form.Input 
                                        type="name" 
                                        id="nameForm" 
                                        placeholder="Введите имя и фамилию"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <label htmlFor="emailForm">E-mail</label>
                                    <Form.Input 
                                        type="email" 
                                        id="emailForm" 
                                        placeholder="Введите email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Check inline>
                                        <Form.CustomCheckbox
                                            id="adminCheck"
                                            checked={isAdmin}
                                            onChange={(e) => setIsAdmin(e.target.checked)}
                                        >
                                        </Form.CustomCheckbox>
                                        <Form.CheckLabel htmlFor="adminCheck">
                                            Админ
                                        </Form.CheckLabel>
                                    </Form.Check>
                                </Form.Group>
                            </Form>
                        </FormContainer>
                    )}
                </Modal.Body>
                <Modal.Footer>
                  <Button secondary data-dismiss="modal">
                    Закрыть
                  </Button>
                  <Button dark>Сохранить</Button>
                </Modal.Footer>
              </Modal.Content>
            </Modal.Dialog>
          </Modal>
        </>
      )}
    </>
  );
};

export default AdminUsersList;
