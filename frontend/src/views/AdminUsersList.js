import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Table, Button } from "bootstrap-4-react";
import { listOfUsers } from "../redux/actions/admin.actions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const AdminUsersList = () => {
    const dispatch = useDispatch();

    const usersList = useSelector(state => state.usersList);
    const { loading, error, userList } = usersList;

    useEffect(() => {
        dispatch(listOfUsers());
    }, [dispatch]);

    const deleteHandler = (id) => {
        console.log(id);
    };

    return (
        <>
            <h2>Список пользователей</h2>
            {loading ? <Loader /> : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
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
                        {userList.map(user => (
                            <tr className="text-center" key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>
                                    <a href={`mailto:${user.email}`}>
                                        {user.email}
                                    </a>
                                </td>
                                <td>
                                    {user.isAdmin ? (
                                        <i className="fas fa-check" style={{ color: 'green' }}></i>
                                    ) : (
                                        <i className="fas fa-times" style={{ color: 'red' }}></i>
                                    )}
                                </td>
                                <td>
                                    <LinkContainer to={`/user/${user._id}/edit`}>
                                        <Button className="btn-sm">
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button className="btn-sm" variant="danger" onClick={() => deleteHandler(user._id)}>
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default AdminUsersList;
