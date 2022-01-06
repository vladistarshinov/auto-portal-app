import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Pagination from "../ui/components/Pagination";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { listOfProduct } from "../redux/actions/product.actions";

const ProductList = ({ products, pages, page, keyword }) => {
  return (
    <>
      <Box>
        {products.map((product) => (
          <Grid
            display="inline-grid"
            container
            direction="row"
            key={product._id}
            xs={12}
            sm={6}
            md={6}
            lg={4}
            xl={3}
          >
            <ProductCard product={product} />
          </Grid>
        ))}
      </Box>
      <Pagination pages={pages} page={page} keyword={keyword ? keyword : ""} />
    </>
  );
};

export default ProductList;
