import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Figure, Button } from "bootstrap-4-react";
import { detailsOfProduct } from "../redux/actions/product.actions";
import Loader from "../ui/components/Loader";
import Message from "../components/Message";
import Rating from "../components/Rating";
import Reviews from "../components/Reviews";
import MetaHeader from '../components/MetaHeader';
import { Form } from "react-bootstrap";
import { genEndOfNoun } from "../filters/GenEndOfNoun";
import styled from 'styled-components';

const ProductDetail = ({ history, match }) => {
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  const productId = match.params.id;
  
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;

  useEffect(() => {
    dispatch(detailsOfProduct(productId));
  }, [dispatch, productId]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?quantity=${quantity}`);
  };

  const ReviewsCount = styled.span`
    margin-left: 0.25rem;
  `;

  return (
    <>
      <Link className="btn btn-light my-3 text-capitalize" to="/">
        <i className="fa fa-arrow-left mr-2" aria-hidden="true"></i>
        Назад
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ): (
        <>
          <MetaHeader title={product.name} />
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
                  {product.numReviews == 0 ? (
                    <ReviewsCount>нет отзывов</ReviewsCount>
                  ) : (
                    <ReviewsCount>{product.numReviews} {genEndOfNoun(product.numReviews, "отзыв", "отзыва", "отзывов")}</ReviewsCount>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>Цена: ${product.price}</ListGroup.Item>
                <ListGroup.Item>Описание: {product.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <ListGroup flush>
                <ListGroup.Item>
                  <Row>
                    <Col>Цена:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Статус:</Col>
                    <Col>
                      {product.countInStock > 0 ? "В наличии" : "Отсутствует"}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        Количество:
                      </Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  {product.countInStock > 0 && (
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block"
                      dark
                      type="button" /* 
                      disabled = {product.countInStock === 0} */
                    >
                      Добавить в корзину
                    </Button>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Reviews productId={productId} product={product} />           
          
        </>
      )}
    </>
  );
};

export default ProductDetail;
