import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import ProductList from "../components/ProductList";
import { listOfProduct } from '../redux/actions/product.actions';
import Loader from '../components/Loader';
import { Row, Col } from 'bootstrap-4-react';

const Home = () => {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const { loading, products, error } = productList;
    useEffect(() => {
        dispatch(listOfProduct());
    }, [dispatch])

    return (
        <>
            <h3 style={{ color: '#070049' }}>Добро пожаловать в магазин IGadgetShop</h3>
            {loading ? (
                <Loader />
            ) : error ? (
                // alert(`${error}`)
                <h3>{error}</h3>
            ) : (
                <Row>
                    {products.map((product) => 
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <ProductList product={product} />
                        </Col>
                    )}
                </Row>
            )}
        </>
    )
}

export default Home;
