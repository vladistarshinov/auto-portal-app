import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProductList from "../components/ProductList";
import { listOfProduct } from '../redux/actions/product.actions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Pagination from '../components/Pagination';
import TopProductsCarousel from '../components/TopProductsCarousel';
import MetaHeader from '../components/MetaHeader';
import { Row, Col } from 'bootstrap-4-react';
import styled from 'styled-components';

const Home = ({ match }) => {
    const keyword = match.params.keyword;
    const pageNumber = match.params.pageNumber || 1;

    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    const { loading, products, page, pages, error } = productList;

    useEffect(() => {
        dispatch(listOfProduct(keyword, pageNumber));
    }, [dispatch, keyword, pageNumber]);

    const Heading = styled.h3`
        color: #070049;
        text-align: center;
        margin-top: 2rem;
        margin-bottom: 1rem;
    `;

    return (
        <>
            <MetaHeader />
            {!keyword ? (
                <>
                    <Heading>Лучшие товары</Heading>
                    <TopProductsCarousel />
                </>
            ) : <Link to="/" className="btn btn-light">Назад</Link>}
            <Heading>Ассортимент товаров</Heading>
            {loading ? (
                <Loader />
            ) : error ? (
                // alert(`${error}`)
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                    <Row>
                        {products.map((product) => 
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <ProductList product={product} />
                            </Col>
                        )}
                    </Row>
                    <Pagination 
                        pages={pages} 
                        page={page} 
                        keyword={keyword ? keyword : ''} 
                    />
                </>
            )}
        </>
    )
}

export default Home;
