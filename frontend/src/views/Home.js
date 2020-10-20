import React from "react";
import products from "../data/products";
import ProductList from "../components/ProductList";
import { Row, Col } from 'bootstrap-4-react';

const Home = () => {
    return (
        <>
            <h3>Добро пожаловать в магазин IGadgetShop</h3>
            <Row>
                {products.map((product) => 
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                       <ProductList product={product} />
                    </Col>
                )}
            </Row>
        </>
    )
}

export default Home;
