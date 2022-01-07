import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsOfProduct } from "../redux/actions/product.actions";
import Loader from "../ui/components/Loader";
import Message from "../ui/components/Message";
import Button from "@mui/material/Button";
import Rating from "../ui/components/Rating";
import Reviews from "../components/Reviews";
import MetaHeader from "../components/MetaHeader";
import { genEndOfNoun } from "../filters/GenEndOfNoun";
import BreadCrumbs from "../ui/components/BreadCrumbs";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SelectInput from "../ui/components/SelectInput";

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

  const ReviewsCount = styled(Box)({
    marginLeft: "0.25rem",
  });

  return (
    <>
      <BreadCrumbs
        navElements={[
          { title: "Catalog" },
          { title: product?.name, url: `/product/${product?._id}` },
        ]}
      />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : (
        <>
          <MetaHeader title={product.name} />
          <Grid container spacing={2}>
            <Grid lg={4} md={4} sm={12} xs={12} item>
              <Box
                component="img"
                sx={{ width: "100%" }}
                src={product.image}
                alt={product.name}
              />
            </Grid>
            <Grid lg={5} md={4} sm={7} xs={12} item>
              <List>
                <ListItemText>
                  <h3>{product.name}</h3>
                </ListItemText>
                <Divider />
                <ListItem sx={{ display: "inline-flex", alignItems: "center" }}>
                  <Rating value={product.rating} />
                  {product.numReviews == 0 ? (
                    <ReviewsCount>нет отзывов</ReviewsCount>
                  ) : (
                    <ReviewsCount>
                      {product.numReviews}{" "}
                      {genEndOfNoun(
                        product.numReviews,
                        "отзыв",
                        "отзыва",
                        "отзывов"
                      )}
                    </ReviewsCount>
                  )}
                </ListItem>
                <Divider />
                <ListItemText>Описание: {product.description}</ListItemText>
              </List>
            </Grid>
            <Grid lg={3} md={4} sm={5} xs={12} item>
              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    <TableRow sx={{ width: "200px" }}>
                      <TableCell>Цена:</TableCell>
                      <TableCell sx={{ fontWeight: "700" }}>
                        ${product.price}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Статус:</TableCell>
                      <TableCell>
                        {product.countInStock > 0 ? "В наличии" : "Отсутствует"}
                      </TableCell>
                    </TableRow>
                    {product.countInStock > 0 && (
                      <TableRow>
                        <TableCell>Количество:</TableCell>
                        <TableCell>
                          <SelectInput value={quantity} onChange={(e) => setQuantity(e.target.value)} countInStock={product.countInStock} />
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                <Box sx={{ py: 2 }} display="flex" justifyContent="center">
                  {product.countInStock > 0 && (
                    <Button
                      variant="outlined"
                      color="inherit"
                      onClick={addToCartHandler}
                      sx={{
                        fontSize: "12px",
                        transition: ".5s",
                        "&:hover": {
                          bgcolor: "primary.dark",
                          color: "#fff",
                        },
                        "&:focus": {
                          outline: "none",
                        },
                      }} /* 
                      disabled = {product.countInStock === 0} */
                    >
                      Добавить в корзину
                    </Button>
                  )}
                </Box>
              </TableContainer>
            </Grid>
          </Grid>
          <Reviews productId={productId} product={product} />
        </>
      )}
    </>
  );
};

export default ProductDetail;
