import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button } from 'bootstrap-4-react';
import { Form } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../redux/actions/cart.actions';

const Payment = ({ history }) => {

    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    if (!shippingAddress) {
        history.push('/shipping');
    }

    const [paymentMethod, setPaymentMethod] = useState("PayPal");

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history.push('/placeorder');
    };

    return (
        <FormContainer>
            <CheckoutSteps step1="done" step2="done" step3="active" />
            <h2 style={{ padding: '1rem 0' }}>Оплата</h2>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as="legend">Выберите способ оплаты</Form.Label>
                    <Row>
                        <Col>
                            <Form.Check 
                                style={{ paddingTop: '10px' }}
                                type="radio" 
                                label="PayPal" 
                                id="PayPal"
                                name="paymentMethod"
                                value="PayPal"
                                checked
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            ></Form.Check>
                            <Form.Check 
                                style={{ paddingTop: '10px' }}
                                type="radio" 
                                label="Кредитная карта" 
                                id="CreditCard"
                                name="paymentMethod"
                                value="Кредитная карта"
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            ></Form.Check>
                        </Col>
                    </Row>
                </Form.Group>
                <Button style={{ marginTop: '20px' }} type="submit" dark>Продолжить</Button>
            </Form>
        </FormContainer>
    );
};

export default Payment;
