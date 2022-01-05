import React, { useEffect } from "react";
import Link from "@mui/material/Link";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "../components/ProductList";
import { listOfProduct } from "../redux/actions/product.actions";
import Loader from "../ui/components/Loader";
import Message from "../components/Message";
import Pagination from "../components/Pagination";
import TopProductsCarousel from "../components/TopProductsCarousel";
import MetaHeader from "../components/MetaHeader";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import UndoIcon from "@mui/icons-material/Undo";

const Home = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, products, page, pages, error } = productList;

  useEffect(() => {
    dispatch(listOfProduct(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  const Heading = styled(Typography)`
    color: #070049;
    text-align: center;
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-size: 2rem;
  `;

  return (
    <>
      <MetaHeader />
      {!keyword ? (
        <>
          <Heading>Лучшие товары</Heading>
          <TopProductsCarousel />
        </>
      ) : (
        <Link
          href="/"
          sx={{
            textDecoration: "none",
          }}
        >
          <Button
            color="inherit"
            sx={{
              mt: 2,
              color: "text.muted",
              "&:focus": {
                outline: "none",
              },
            }}
          >
            <UndoIcon sx={{ mr: 1 }} />
            Назад
          </Button>
        </Link>
      )}
      <Heading>Ассортимент товаров</Heading>
      {loading ? (
        <Loader />
      ) : error ? (
        // alert(`${error}`)
        <Message variant="error">{error}</Message>
      ) : (
        <>
          <Box>
            {products.map((product) => (
              <Grid
                display="inline-grid"
                container
                direction="row"
                key={product._id}
                sm={12}
                md={6}
                lg={4}
                xl={3}
              >
                <ProductList product={product} />
              </Grid>
            ))}
          </Box>
          <Pagination
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default Home;
