import React from 'react';
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Figure, Button } from "bootstrap-4-react";
import products from "../data/products";
import Rating from "../components/Rating";

const ProductDetail = (props) => {

    const product = products.find(p => p._id === props.match.params.id);

    return (
        <>
            <Link className="btn btn-light my-3" to="/">
                <i className="fa fa-arrow-left mr-2" aria-hidden="true"></i>
                На главную
            </Link>
            <Row>
                <Col md={5}>
                    <Figure.Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={4}>
                    <ListGroup flush>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item className="d-inline-flex">
                            <Rating value={product.rating} />
                            <span className="reviews">{product.numReviews} отзывов</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Цена: ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Описание: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <ListGroup flush>
                        <ListGroup.Item>
                            <Row>
                                <Col>Цена:</Col> 
                                <Col><strong>${product.price}</strong></Col>   
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Статус:</Col> 
                                <Col>{product.countInStock > 0 ? "В наличии" : "Отсутствует"}</Col>   
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {product.countInStock > 0 && 
                            <Button className="btn-block" dark type="button" /* disabled = {product.countInStock === 0} */>
                                Добавить в корзину
                            </Button>}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>

        </>
    )
}

export default ProductDetail;
