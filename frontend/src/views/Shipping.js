import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'bootstrap-4-react';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../redux/actions/cart.actions';

const Shipping = ({ history }) => {

    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        history.push('/payment');
    };

    return (
        <FormContainer>
            <CheckoutSteps step1="done" step2="active" />
            <h2 style={{ padding: '1rem 0' }}>Доставка</h2>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <label htmlFor="addressForm">Адрес</label>
                    <Form.Input 
                        type="text" 
                        id="addressForm" 
                        placeholder="Введите адрес"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <label htmlFor="cityForm">Город</label>
                    <Form.Input 
                        type="text" 
                        id="cityForm" 
                        placeholder="Введите город"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <label htmlFor="postalForm">Город</label>
                    <Form.Input 
                        type="text" 
                        id="postalForm" 
                        placeholder="Введите почтовый индекс"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <label htmlFor="countryForm">Страна</label>
                    <Form.Input 
                        type="text" 
                        id="countryForm" 
                        placeholder="Введите страну"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </Form.Group>
                <Button type="submit" dark>Продолжить</Button>
            </Form>
        </FormContainer>
    );
};

export default Shipping;
