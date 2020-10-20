import React from "react";
import products from "../data/products";
import { Row, Col } from 'bootstrap-4-react';

const Home = () => {
    return (
        <>
            <h3>Добро пожаловать в магазин IGadgetShop</h3>
            <Row>
                {products.map((product) => 
                    <Col sm={12} md={6} lg={4}>
                        <h4>{product.name}</h4>
                    </Col>
                )}
            </Row>
        </>
    )
}

export default Home;
