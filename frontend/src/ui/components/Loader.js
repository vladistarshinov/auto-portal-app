import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";

const Loader = () => {
  const Wrapper = styled(Box)({
    position: "absolute",
    left: -24,
    top: -24,
    width: "calc(100% + 48px)",
    height: "90vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#fff",
    zIndex: 2,
  });

  return (
    <Wrapper>
      <CircularProgress />
    </Wrapper>
  );
};

export default Loader;
