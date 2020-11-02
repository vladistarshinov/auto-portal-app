import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Table, Modal, Figure, Button } from "bootstrap-4-react";
import { Form } from 'react-bootstrap';
import { listOfProduct } from "../redux/actions/product.actions";
import { createProduct } from "../redux/actions/admin.actions";
import { PRODUCT_CREATE_RESET } from "../redux/constants/admin.constants";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";

const AdminProductList = ({ history, match }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");

  const productList = useSelector(state => state.productList);
  const { loading, products, error } = productList;

  const productCreate = useSelector(state => state.productCreate);
  const { loading: loadingCreateProduct, 
          success: successCreateProduct,
          product: createdProduct, 
          error: errorCreateProduct } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successCreateProduct) {
      dispatch({ type: PRODUCT_CREATE_RESET });
    }
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOfProduct());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  const editProductHandler = () => {

  };

  const submitProductAddHandler = () => {
    dispatch(createProduct({
      user: userInfo._id,
      name, 
      description, 
      image, 
      price, 
      countInStock, 
      brand, 
      category,
      numReviews: 0
    }));
  };

  const deleteProductHandler = (id) => {
    if (window.confirm("Вы действительно хотите удалить пользователя?")) {
      // DELETE PRODUCTS
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h2>Список товаров</h2>
        </Col>
        <Col className="text-right">
          <Button 
            className="my-3" 
            data-toggle="modal" 
            data-target="#createModal" 
            light
          >
            <i className="fas fa-plus" style={{ paddingRight: '0.5rem' }}></i>
            <span>Добавить</span>
          </Button>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {successCreateProduct && <Message variant="success">Товар создан</Message>}
          <Table className="table-sm" striped bordered hover responsive>
            <thead>
              <tr className="text-center">
                <th>#</th>
                <th>Название</th>
                <th>Цена</th>
                <th>Категория</th>
                <th>Бренд</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr className="text-center" key={product._id}>
                  <td>{product._id}</td>
                  <td>
                    <Link
                      style={{
                        color: "navy",
                        textDecoration: "none",
                      }}
                      to={`/product/${product._id}`}
                    >
                      {product.name}
                    </Link>
                  </td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <Button
                      className="btn-sm"
                      onClick={() => editProductHandler(product._id)}
                      warning
                      data-toggle="modal"
                      data-target="#editModal"
                      style={{ marginRight: "0.5rem" }}
                    >
                      <i className="fas fa-edit"></i>
                    </Button>
                    <Button
                      className="btn-sm"
                      danger
                      onClick={() => deleteProductHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* Modal */}
          <Modal id="createModal" fade>
            <Modal.Dialog style={{ maxWidth: '70vw' }}>
              <Modal.Content>
                <Modal.Header>
                  <Modal.Title>Создание нового товара</Modal.Title>
                  <Modal.Close>
                    <span aria-hidden="true">&times;</span>
                  </Modal.Close>
                </Modal.Header>
                <Modal.Body> 
                  {loadingCreateProduct ? (
                    <Loader />
                  ) : errorCreateProduct ? (
                    <Message variant="danger">{errorCreateProduct}</Message>
                  ) : (
                    <FormContainer>
                      <Form onSubmit={submitProductAddHandler}>      
                        <Form.Group>
                          <label>Название товара</label>
                          <Form.Control
                            type="name"
                            id="nameForm"
                            placeholder="Введите название товара"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group>
                          <label>Описание</label>
                          <Form.Control
                            type="text"
                            id="descriptionForm"
                            placeholder="Введите описание товара"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group>
                            <label>Фото товара</label>
                            <Form.Control
                                type="text"
                                id="photoForm"
                                placeholder="Введите ссылку на фото"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                        </Form.Group>
                        <Row>
                          <Col>
                            <Form.Group>
                              <label>Цена</label>
                              <Form.Control
                                  type="number"
                                  id="priceForm"
                                  placeholder="Введите цену"
                                  value={price}
                                  onChange={(e) => setPrice(e.target.value)}
                              />
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group>
                              <label>Количество</label>
                              <Form.Control
                                  type="number"
                                  id="countInStockForm"
                                  placeholder="Введите кол-во"
                                  value={countInStock}
                                  onChange={(e) => setCountInStock(e.target.value)}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Form.Group>
                              <label>Категория</label>
                              <Form.Control
                                  type="text"
                                  id="categoryForm"
                                  placeholder="Введите категорию"
                                  value={category}
                                  onChange={(e) => setCategory(e.target.value)}
                              />
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group>
                              <label>Бренд</label>
                              <Form.Control
                                  type="text"
                                  id="brandForm"
                                  placeholder="Введите бренд"
                                  value={brand}
                                  onChange={(e) => setBrand(e.target.value)}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row 
                          style={{
                          display: "flex",
                          justifyContent: "center"
                          }}
                        >
                          <Button secondary data-dismiss="modal" style={{ marginRight: '0.3rem' }}>
                            Закрыть
                          </Button>
                          <Button type="submit" dark>Сохранить</Button>
                        </Row>
                      </Form>
                    </FormContainer>
                  )}
                </Modal.Body>
              </Modal.Content>
            </Modal.Dialog>
          </Modal>
        </>
      )}
    </>
  );
};

export default AdminProductList;
