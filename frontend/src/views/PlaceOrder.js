import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Figure, Button } from 'bootstrap-4-react';
import { Link } from "react-router-dom";
import { Card } from 'react-bootstrap';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../redux/actions/cart.actions';

const PlaceOrder = () => {
    const cart = useSelector(state => state.cart);

    const addDecimal = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    };

    cart.priceItems = addDecimal(cart.cartProductItems
        .reduce((acc, item) => acc + item.price * item.quantity,
        0)
    );

    cart.shippingPrice = addDecimal(cart.priceItems > 300 ? 0 : 100);
    cart.taxPrice = addDecimal(Number((0.13 * cart.priceItems)));
    cart.totalPrice = addDecimal(Number(cart.priceItems) 
        + Number(cart.shippingPrice) 
        + Number(cart.taxPrice)
    );

    const placeOrderHandler = () => {
        
    };

    return (
        <>
            <CheckoutSteps step1="done" step2="done" step3="done" step4="active" />
            <Row>
                <Col md={8}>
                    <ListGroup flush>
                        <ListGroup.Item>
                            <h2>Доставка</h2>
                            <p>
                                <strong>Адрес:{' '}</strong>
                                {cart.shippingAddress.address},{' '}
                                {cart.shippingAddress.city},{' '}
                                {cart.shippingAddress.postalCode},{' '}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Оплата</h2>
                            <strong>Способ:{' '}</strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Заказ</h2>
                            {cart.cartProductItems.length === 0 ? (
                                <Message>Ваша корзина пуста</Message>
                            ) : (
                                <ListGroup flush>
                                    {cart.cartProductItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={2}>
                                                    <Figure.Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link 
                                                        style={{ color: 'navy', textDecoration: 'none' }} 
                                                        to={`/product/${item.product}`}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.quantity} * ${item.price} ={' '}
                                                    ${item.quantity * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup flush>
                            <ListGroup.Item>
                                <h4>Суммарный заказ</h4>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Товары</Col>
                                    <Col>${cart.priceItems}</Col>            
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Доставка</Col>
                                    <Col>${cart.shippingPrice}</Col>            
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Налог</Col>
                                    <Col>${cart.taxPrice}</Col>            
                                </Row>   
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col><strong>Итого</strong></Col>
                                    <Col><strong>${cart.totalPrice}</strong></Col>            
                                </Row>   
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button 
                                    type="button"
                                    className="btn-block"
                                    dark
                                    disabled={cart.cartProductItems === 0}
                                    onClick={placeOrderHandler}
                                >Отправить
                                </Button> 
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default PlaceOrder;
