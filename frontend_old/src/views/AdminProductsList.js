import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listOfProduct } from "../redux/actions/product.actions";
import {
  createProduct,
  updateProduct,
  removeProduct,
} from "../redux/actions/admin.actions";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_RESET,
} from "../redux/constants/admin.constants";
import Loader from "../ui/components/Loader";
import Message from "../ui/components/Message";
import Pagination from "../ui/components/Pagination";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ProductModal from "../components/modals/ProductModal";
import useMediaQuery from "@mui/material/useMediaQuery";
import AddIcon from "@mui/icons-material/Add";
import { uploadFile } from "../redux/actions/file.actions";

const AdminProductList = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const [openModal, setOpenModal] = useState(false);
  const [type, setType] = useState("");
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width:450px)");
  const isTablet = useMediaQuery("(max-width:750px)");

  const imgSrc = localStorage.getItem("productImage");
  const [productData, setProductData] = useState(null);

  const productList = useSelector((state) => state.productList);
  const { loading, products, pages, page, error } = productList;

  const uploadingImage = useSelector((state) => state.uploadingImage);
  const { loading: uploading, image, error: errorUploading } = uploadingImage;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreateProduct,
    success: successCreateProduct,
    error: errorCreateProduct,
  } = productCreate;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdateProduct,
    success: successUpdateProduct,
    error: errorUpdateProduct,
  } = productUpdate;

  const productRemove = useSelector((state) => state.productRemove);
  const {
    loading: loadingDeleteProduct,
    success: successDeleteProduct,
    error: errorDeleteProduct,
  } = productRemove;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo.isAdmin) {
      history.push("/login");
    } else {
      dispatch(listOfProduct("", pageNumber));
    }
  }, [
    dispatch,
    pageNumber,
    history,
    userInfo,
    successCreateProduct,
    successUpdateProduct,
    successDeleteProduct,
  ]);

  useEffect(() => {
    if (image) setProductData({ ...productData, image: image });
  }, [image]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    dispatch(uploadFile(file));
  };

  const addProductHandler = () => {
    setOpenModal(true);
    setType("create");
    setProductData(null);
  };

  const submitProductAddHandler = () => {
    dispatch(createProduct(productData));
  };

  const editProductHandler = (productId) => {
    setOpenModal(true);
    setType("edit");
    const product = products.find((product) => product._id == productId);
    setProductData({
      _id: product._id,
      name: product.name,
      description: product.description,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
      brand: product.brand,
      category: product.category,
    });
  };

  const submitProductEditHandler = () => {
    dispatch(updateProduct(productData));
  };

  const deleteProductHandler = (id) => {
    if (window.confirm("Вы действительно хотите удалить товар?")) {
      dispatch(removeProduct(id));
    }
  };

  const LinkToProductDetails = styled(Link)({
    color: "navy",
    textDecoration: "none",
  });

  return (
    <>
      <Box sx={{ marginTop: "30px" }}>
        {successDeleteProduct && (
          <Message variant="success">Товар удален</Message>
        )}
        {successCreateProduct && (
          <Message variant="success">Товар создан</Message>
        )}
        {successUpdateProduct && (
          <Message variant="success">Товар обновлен</Message>
        )}
        {(loadingCreateProduct ||
          loadingUpdateProduct ||
          loadingDeleteProduct) && <Loader />}
        {(errorCreateProduct || errorUpdateProduct || errorDeleteProduct) && (
          <Message variant="error">{error}</Message>
        )}
      </Box>
      <Grid container display="flex" alignItems="center">
        <Grid item xs={8} sm={10} md={10}>
          <Typography variant="h5" sx={{ padding: "1rem 0" }}>
            Список товаров
          </Typography>
        </Grid>
        <Grid item xs={4} sm={2} md={2}>
          <Button
            variant="outlined"
            color="inherit"
            component="span"
            onClick={() => addProductHandler()}
          >
            <AddIcon sx={{ pr: "0.5rem" }}></AddIcon>
            <span>Добавить</span>
          </Button>
        </Grid>
      </Grid>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : isTablet ? (
        products.map((product, index) => (
          <TableContainer key={product._id} idx={index}>
            <Table sx={{ minWidth: 300 }}>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">
                  {isMobile ? index + 1 : product._id}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">Название</TableCell>
                <TableCell align="center">
                  <LinkToProductDetails to={`/product/${product._id}`}>
                    {product.name}
                  </LinkToProductDetails>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">Цена</TableCell>
                <TableCell align="center">${product.price}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">Категория</TableCell>
                <TableCell align="center">{product.category}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">Бренд</TableCell>
                <TableCell align="center">{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">Действия</TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => editProductHandler(product._id)}
                    style={{ marginRight: "0.5rem" }}
                  >
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton onClick={() => deleteProductHandler(product._id)}>
                    <DeleteIcon color="secondary" />
                  </IconButton>
                </TableCell>
              </TableRow>
            </Table>
          </TableContainer>
        ))
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow align="center">
                <TableCell align="center">#</TableCell>
                <TableCell align="center">Название</TableCell>
                <TableCell align="center">Цена</TableCell>
                <TableCell align="center">Категория</TableCell>
                <TableCell align="center">Бренд</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow align="center" key={product._id}>
                  <TableCell align="center">{product._id}</TableCell>
                  <TableCell align="center">
                    <LinkToProductDetails to={`/product/${product._id}`}>
                      {product.name}
                    </LinkToProductDetails>
                  </TableCell>
                  <TableCell align="center">${product.price}</TableCell>
                  <TableCell align="center">{product.category}</TableCell>
                  <TableCell align="center">{product.brand}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => editProductHandler(product._id)}
                      style={{ marginRight: "0.5rem" }}
                    >
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton
                      onClick={() => deleteProductHandler(product._id)}
                    >
                      <DeleteIcon color="secondary" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination pages={pages} page={page} isAdmin={true} />
        </TableContainer>
      )}
      <ProductModal
        type={type}
        open={openModal}
        setOpen={(bool) => setOpenModal(bool)}
        productData={productData}
        setProductData={setProductData}
        action={() => {
          if (type === "create") submitProductAddHandler();
          else submitProductEditHandler();
        }}
        uploadFileHandler={uploadFileHandler}
        uploading={uploading}
      />
    </>
  );
};

export default AdminProductList;
