import React, { useEffect } from "react";
import Link from "@mui/material/Link";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "../components/ProductList";
import { listOfProduct } from "../redux/actions/product.actions";
import Loader from "../ui/components/Loader";
import Message from "../ui/components/Message";
import TopProductsCarousel from "../components/TopProductsCarousel";
import MetaHeader from "../components/MetaHeader";
import { styled } from "@mui/material/styles";
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

  const Heading = styled(Typography)({
    color: "#070049",
    textAlign: "center",
    marginTop: "2rem",
    marginBottom: "1rem",
    fontSize: "2rem",
  });

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
          <ProductList
            products={products}
            pages={pages}
            page={page}
            keyword={keyword}
          />
        </>
      )}
    </>
  );
};

export default Home;
