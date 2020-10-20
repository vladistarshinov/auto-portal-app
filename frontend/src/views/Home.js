import React, { useState, useEffect } from "react";
import ProductList from "../components/ProductList";
import { Row, Col } from 'bootstrap-4-react';
import axios from "axios";

const Home = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const { data } = await axios.get("/api/products");

            setProducts(data);
        }
        getProducts()
    }, [])

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
