import React, { useEffect } from "react";
import Link from "@mui/material/Link";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Message from "../ui/components/Message";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  addProductToCart,
  removeProductFromCart,
} from "../redux/actions/cart.actions";
import { styled } from "@mui/material/styles";
import SelectInput from "../ui/components/SelectInput";
import BreadCrumbs from "../ui/components/BreadCrumbs";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { productQuantity, productQuantityPrice } from "../utils/productCalc";
import DeleteIcon from "@mui/icons-material/Delete";

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

  const LinkToProductDetails = styled(Link)({
    color: "navy",
    textDecoration: "none",
  });

  return (
    <>
      <BreadCrumbs
        navElements={[{ title: "Каталог" }, { title: "Корзина", url: "/cart" }]}
      />
      <Typography variant="h4" style={{ padding: "1rem 0" }}>
        Корзина
      </Typography>
      <Grid container spacing={3}>
        <Grid lg={8} md={8} sm={12} xs={12} item>
          {cartProductItems.length === 0 ? (
            <>
              <Message>Корзина пустая</Message>
            </>
          ) : (
            <Card>
              {cartProductItems.map((item) => (
                <CardContent key={item.product}>
                  <Grid>
                    <Grid
                      container
                      spacing={2}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid lg={3} md={3} sm={5} xs={12} item>
                        <Box
                          component="img"
                          sx={{ width: "100%" }}
                          src={item.image}
                          alt={item.name}
                        />
                      </Grid>
                      <Grid lg={3} md={3} sm={6} xs={12} item>
                        <LinkToProductDetails href={`/product/${item.product}`}>
                          {item.name}
                        </LinkToProductDetails>
                      </Grid>
                      <Grid lg={2} md={2} sm={2} xs={4} item>
                        ${item.price}
                      </Grid>
                      <Grid lg={2} md={2} sm={2} xs={4} item>
                        <SelectInput
                          value={item.quantity}
                          onChange={(e) =>
                            dispatch(
                              addProductToCart(item.product, e.target.value)
                            )
                          }
                          countInStock={item.countInStock}
                        />
                      </Grid>
                      <Grid lg={1} md={1} sm={2} xs={4} item>
                        <IconButton
                          color="inherit"
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          <DeleteIcon color="error"></DeleteIcon>
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              ))}
            </Card>
          )}
        </Grid>
        <Grid lg={4} md={4} sm={12} xs={12} item>
          <Grid>
            <Card>
              <CardContent>
                <Typography variant="h5">К оплате</Typography>
                <Typography>
                  Общее количество товара: {productQuantity(cartProductItems)}{" "}
                  шт.
                </Typography>
                <Typography
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                  variant="h5"
                >
                  ${productQuantityPrice(cartProductItems)}
                </Typography>
                <Button
                  variant="outlined"
                  disabled={cartProductItems.length === 0}
                  color="inherit"
                  onClick={checkoutHandler}
                >
                  Рассчитать
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Cart;
