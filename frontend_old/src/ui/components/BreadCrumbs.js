import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

const BreadCrumbs = ({ navElements }) => {
  return (
    <Box role="presentation" sx={{ my: 3 }}>
      <Breadcrumbs aria-label="breadcrumb">
        {navElements !== [] &&
          navElements.map((elem, idx) => (
            <Link
              underline="hover"
              color={
                idx === navElements.length - 1 ? "text.primary" : "inherit"
              }
              href={elem.url ? `${elem.url}` : "/"}
            >
              {elem.title}
            </Link>
          ))}
      </Breadcrumbs>
    </Box>
  );
};

export default BreadCrumbs;
