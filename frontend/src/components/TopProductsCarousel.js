import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../ui/components/Loader";
import Message from "../ui/components/Message";
import { listOfTopProduct } from "../redux/actions/product.actions";
import Carousel from "../ui/components/Carousel";
import Box from "@mui/material/Box";

const TopProductsCarousel = () => {
  const dispatch = useDispatch();

  const productTop = useSelector((state) => state.productTop);
  const { loading, products, error } = productTop;

  useEffect(() => {
    dispatch(listOfTopProduct());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="error">{error}</Message>
  ) : (
    <Box
      display="flex"
      justifyContent="center"
      sx={{ background: "#f8f9fa", p: 2 }}
    >
      <Carousel products={products} />
    </Box>
  );
};

export default TopProductsCarousel;
