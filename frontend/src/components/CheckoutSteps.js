import React from 'react';
import { LinkContainer } from "react-router-bootstrap";
import { Nav } from 'bootstrap-4-react';
import styled from 'styled-components';

const StepLink = styled.p`
    font-size: 0.9rem;
`;

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {

    return (
        <Nav className="justify-content-center mb-4">
            <Nav.Item>
                {step1  ? (
                    step1 === "done"
                    ) ? ( 
                        <LinkContainer text="success" to="/login">
                            <Nav.Link><StepLink>Авторизация</StepLink></Nav.Link>
                        </LinkContainer>
                    ) : (
                        <LinkContainer 
                            text="info"
                            to="/login"
                        >
                            <Nav.Link><StepLink>Авторизация</StepLink></Nav.Link>
                        </LinkContainer>
                ) : (
                    <Nav.Link text="muted" disabled><StepLink>Авторизация</StepLink></Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step2 ? (
                    step2 === "done"
                    ) ? ( 
                        <LinkContainer text="success" to="/shipping">
                            <Nav.Link><StepLink>Доставка</StepLink></Nav.Link>
                        </LinkContainer>
                    ) : (
                        <LinkContainer 
                            text="info"
                            to="/shipping"
                        >
                            <Nav.Link><StepLink>Доставка</StepLink></Nav.Link>
                        </LinkContainer>
                ) : (
                    <Nav.Link text="muted" disabled><StepLink>Доставка</StepLink></Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step3 ? (
                    step3 === "done"
                    ) ? ( 
                        <LinkContainer text="success" to="/payment">
                            <Nav.Link><StepLink>Оплата</StepLink></Nav.Link>
                        </LinkContainer>
                    ) : (
                        <LinkContainer 
                            text="info"
                            to="/payment"
                        >
                            <Nav.Link><StepLink>Оплата</StepLink></Nav.Link>
                        </LinkContainer>
                ) : (
                    <Nav.Link text="muted" disabled><StepLink>Оплата</StepLink></Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step4 ? (
                    step4 === "done"
                    ) ? ( 
                        <LinkContainer text="success" to="/placeorder">
                            <Nav.Link><StepLink>Заказ</StepLink></Nav.Link>
                        </LinkContainer>
                    ) : (
                        <LinkContainer 
                            text="info"
                            to="/placeorder"
                        >
                            <Nav.Link><StepLink>Заказ</StepLink></Nav.Link>
                        </LinkContainer>
                ) : (
                    <Nav.Link text="muted" disabled><StepLink>Заказ</StepLink></Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    );
};

export default CheckoutSteps;
