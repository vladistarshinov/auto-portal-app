import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Table, Modal, Figure, Button } from "bootstrap-4-react";
import { Form } from 'react-bootstrap';
import { listOfProduct } from "../redux/actions/product.actions";
import { createProduct, updateProduct, removeProduct } from "../redux/actions/admin.actions";
import { PRODUCT_CREATE_RESET, PRODUCT_UPDATE_RESET } from "../redux/constants/admin.constants";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Pagination from '../components/Pagination';
import styled from 'styled-components';

const AdminProductList = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const imgSrc = localStorage.getItem("productImage");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [uploading, setUploading] = useState(false);

  const productList = useSelector(state => state.productList);
  const { loading, products, pages, page, error } = productList;

  const productCreate = useSelector(state => state.productCreate);
  const { loading: loadingCreateProduct, 
          success: successCreateProduct,
          error: errorCreateProduct } = productCreate;
  
  const productUpdate = useSelector(state => state.productUpdate);
  const { loading: loadingUpdateProduct, 
          success: successUpdateProduct,
          error: errorUpdateProduct } = productUpdate;

  const productRemove = useSelector(state => state.productRemove);
  const { loading: loadingDeleteProduct, 
          success: successDeleteProduct,
          error: errorDeleteProduct } = productRemove;
          
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo.isAdmin) {
      history.push("/login");
    } else {
      dispatch(listOfProduct('', pageNumber));
    }
    
    if (successCreateProduct) {
      dispatch({ type: PRODUCT_CREATE_RESET });
    }

    if (successUpdateProduct) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
    }
  }, [dispatch, pageNumber, history, userInfo, successCreateProduct, successUpdateProduct, successDeleteProduct]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    const formData = new FormData();
    formData.append("image", file);
    console.log(formData);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      let { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      localStorage.setItem("productImage", data);
      setUploading(false);
    } catch(error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitProductAddHandler = () => {
    dispatch(createProduct({
      name, 
      description, 
      image, 
      price, 
      countInStock, 
      brand, 
      category
    }));
  };

  const editProductHandler = (productId) => {
    const product = products.find((product) => product._id == productId);
    setName(product.name);
    setDescription(product.description);
    setImage(product.image);
    setPrice(product.price);
    setCountInStock(product.countInStock);
    setBrand(product.brand);
    setCategory(product.category);
    setId(product._id);
  };

  const submitProductEditHandler = () => {
    dispatch(updateProduct({
      _id: id,
      name, 
      description, 
      image, 
      price, 
      countInStock, 
      brand, 
      category
    }));
  }; 

  const deleteProductHandler = (id) => {
    if (window.confirm("Вы действительно хотите удалить пользователя?")) {
      dispatch(removeProduct(id));
    }
  };

  const Title = styled.h2`
    padding: 1rem 0;
  `;

  const PlusIcon = styled.i`
    padding-right: 0.5rem
  `;

  const LinkToProductDetails = {
    color: 'navy',
    textDecoration: 'none'
  };

  const ModalDialog = { 
    maxWidth: '70vw' 
  };

  const CenterLayout = {
    display: 'flex',
    justifyContent: 'center'
  };

  return (
    <>
      {successDeleteProduct && <Message variant="danger">Товар удален</Message>}
      {successCreateProduct && <Message variant="success">Товар создан</Message>}
      {successUpdateProduct && <Message variant="success">Товар обновлен</Message>}
      <Row className="align-items-center">
        <Col>
          <Title>Список товаров</Title>
        </Col>
        <Col className="text-right">
          <Button 
            className="my-3" 
            data-toggle="modal" 
            data-target="#createModal" 
            light
          >
            <PlusIcon className="fas fa-plus"></PlusIcon>
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
                      style={LinkToProductDetails}
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
          <Pagination pages={pages} page={page} isAdmin={true} />
          {/* Modal */}
          <Modal id="createModal" fade>
            <Modal.Dialog style={ModalDialog}>
              <Modal.Content>
                <Modal.Header>
                  <Modal.Title>Создание нового товара</Modal.Title>
                  <Modal.Close>
                    <span aria-hidden="true">&times;</span>
                  </Modal.Close>
                </Modal.Header>
                  {loadingCreateProduct || loadingDeleteProduct && <Loader />}
                  {errorCreateProduct && <Message variant="danger">{errorCreateProduct}</Message>}
                  {loading ? (
                    <Loader />
                  ) : error ? (
                    <Message variant="danger">{error}</Message>
                  ) : (
                    <FormContainer>
                      <Form onSubmit={submitProductAddHandler}>      
                        <Modal.Body>
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
                              <Form.File 
                                id="image-file"
                                label="Выберите файл"
                                custom
                                onChange={uploadFileHandler}
                              />
                              {uploading && <Loader />}
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
                            style={CenterLayout}
                          >
                            <Button secondary data-dismiss="modal" style={{ marginRight: '0.4rem'}}>
                              Закрыть
                            </Button>
                            <Button type="submit" dark>Сохранить</Button>
                          </Row>
                        </Modal.Body>
                      </Form>
                    </FormContainer>
                  )}
              </Modal.Content>
            </Modal.Dialog>
          </Modal>
          {/* Modal */}
          <Modal id="editModal" fade>
            <Modal.Dialog style={ModalDialog}>
              <Modal.Content>
                <Modal.Header>
                  <Modal.Title>Изменение данных о товаре</Modal.Title>
                  <Modal.Close>
                    <span aria-hidden="true">&times;</span>
                  </Modal.Close>
                </Modal.Header> 
                  {loadingUpdateProduct && <Loader />}
                  {errorUpdateProduct && <Message variant="danger">{errorUpdateProduct}</Message>}
                  {loading ? (
                    <Loader />
                  ) : error ? (
                    <Message variant="danger">{error}</Message>
                  ) : (
                    <FormContainer>
                      <Form onSubmit={submitProductEditHandler}>
                        <Modal.Body>      
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
                              <Form.File 
                                id="image-file"
                                label="Выберите файл"
                                custom
                                onChange={uploadFileHandler}
                              />
                              {uploading && <Loader />}
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
                            style={CenterLayout}
                          >
                            <Button secondary data-dismiss="modal" style={{ marginRight: '0.4rem'}}>
                              Закрыть
                            </Button>
                            <Button type="submit" dark>Обновить</Button>
                          </Row>
                        </Modal.Body>
                      </Form>
                    </FormContainer>
                  )}
              </Modal.Content>
            </Modal.Dialog>
          </Modal>
        </>
      )}
    </>
  );
};

export default AdminProductList;
