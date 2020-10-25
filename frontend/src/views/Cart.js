import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Figure, Button } from "bootstrap-4-react";
import { Card } from "react-bootstrap";
import Message from "../components/Message";
import { addProductToCart, removeProductFromCart } from "../redux/actions/cart.actions";
import { Form } from "react-bootstrap";

const Cart = ({ match, location, history }) => {
  const productId = match.params.id;
  const quantity = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cartProductList = useSelector((state) => state.cart);
  const { cartProductItems } = cartProductList;

  useEffect(() => {
    if (productId) {
      dispatch(addProductToCart(productId, quantity));
    }
  }, [dispatch, productId, quantity]);

  const removeFromCartHandler = (id) => {
    dispatch(removeProductFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <>
      {cartProductItems.length === 0 && (
        <Link className="btn btn-light my-3" to="/">
          <i className="fa fa-arrow-left mr-2" aria-hidden="true"></i>К каталогу
        </Link>
      )}
      <h2>Корзина</h2>
      <Row>
        <Col md={8}>
          {cartProductItems.length === 0 ? (
            <>
              <Message>Корзина пустая</Message>
            </>
          ) : (
            <ListGroup variant="flush">
              {cartProductItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Col md={3}>
                      <Figure.Image
                        src={item.image}
                        alt={item.name}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col md={3}>
                      <Link style={{ color: 'navy', textDecoration: 'none' }} to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.quantity}
                        onChange={(e) =>
                          dispatch(
                            addProductToCart(item.product, e.target.value)
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={1}>
                      <Button
                        type="button"
                        variant="light"
                        style={{ color: '#800000' }}
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="fa fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h4>К оплате</h4>
                <span>
                  Общее количество товара:{" "}
                  {cartProductItems.reduce(
                    (acc, item) => acc + +item.quantity,
                    0
                  )}{" "}
                  шт.
                </span>
                <h4 className="text-right">
                  <strong>
                    $
                    {cartProductItems
                      .reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )
                      .toFixed(2)}
                  </strong>
                </h4>
                {cartProductItems.length === 0 
                ? (
                  <Button
                    type="button"
                    className="btn-block"
                    dark
                    disabled
                    style={{
                      cursor: "inherit",
                    }}
                >
                  Рассчитать
                </Button>
                ) : (
                  <Button
                    type="button"
                    className="btn-block"
                    dark
                    onClick={checkoutHandler}
                >
                  Рассчитать
                </Button>
                )} 
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Cart;
