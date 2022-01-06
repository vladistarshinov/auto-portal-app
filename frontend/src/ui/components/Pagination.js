import React from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";

const PaginationBox = ({ pages, page, isAdmin = false, keyword = "" }) => {
  const PaginationWrapper = styled(Box)({
    display: "flex",
    justifyContent: "center",
    margin: "20px",
  });

  return (
    pages > 1 && (
      <PaginationWrapper>
        <Pagination
          variant="outlined"
          color="primary"
          page={page}
          count={pages}
          renderItem={(item) => (
            <PaginationItem
              sx={{
                "&:hover": {
                  textDecoration: "none",
                  color: "black",
                },
              }}
              component={Link}
              to={
                !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${item.page}`
                    : `/page/${item.page}`
                  : `/admin/products/${item.page}`
              }
              {...item}
            />
          )}
        />
      </PaginationWrapper>
    )
  );
};

export default PaginationBox;
