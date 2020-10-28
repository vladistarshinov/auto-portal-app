import React from 'react';
import { LinkContainer } from "react-router-bootstrap";
import { Nav } from 'bootstrap-4-react';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <Nav className="justify-content-center mb-4">
            <Nav.Item>
                {step1  ? (
                    step1 == "done"
                    ) ? ( 
                        <LinkContainer style={{ color: 'seagreen' }} to="/login">
                            <Nav.Link>Авторизация</Nav.Link>
                        </LinkContainer>
                    ) : (
                        <LinkContainer 
                            style={{ 
                                color: 'navy', 
                                borderBottom: '1px solid navy' 
                            }} 
                            to="/login"
                        >
                            <Nav.Link>Авторизация</Nav.Link>
                        </LinkContainer>
                ) : (
                    <Nav.Link disabled>Авторизация</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step2 ? (
                    step2 == "done"
                    ) ? ( 
                        <LinkContainer style={{ color: 'seagreen' }} to="/login">
                            <Nav.Link>Доставка</Nav.Link>
                        </LinkContainer>
                    ) : (
                        <LinkContainer 
                            style={{ 
                                color: 'navy', 
                                borderBottom: '1px solid navy' 
                            }} 
                            to="/login"
                        >
                            <Nav.Link>Доставка</Nav.Link>
                        </LinkContainer>
                ) : (
                    <Nav.Link disabled>Доставка</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step3 ? (
                    step3 == "done"
                    ) ? ( 
                        <LinkContainer style={{ color: 'seagreen' }} to="/login">
                            <Nav.Link>Оплата</Nav.Link>
                        </LinkContainer>
                    ) : (
                        <LinkContainer 
                            style={{ 
                                color: 'navy', 
                                borderBottom: '1px solid navy' 
                            }} 
                            to="/login"
                        >
                            <Nav.Link>Оплата</Nav.Link>
                        </LinkContainer>
                ) : (
                    <Nav.Link disabled>Оплата</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step4 ? (
                    step4 == "done"
                    ) ? ( 
                        <LinkContainer style={{ color: 'seagreen' }} to="/login">
                            <Nav.Link>Заказ</Nav.Link>
                        </LinkContainer>
                    ) : (
                        <LinkContainer style={{ color: 'navy', borderBottom: '1px solid navy' }} to="/login">
                            <Nav.Link>Заказ</Nav.Link>
                        </LinkContainer>
                ) : (
                    <Nav.Link disabled>Заказ</Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    );
};

export default CheckoutSteps;
