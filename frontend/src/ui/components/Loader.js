import React from "react";
import { Spinner } from "react-bootstrap";
import styled from "styled-components";

const Loader = () => {
  const Wrapper = styled.div`
    width: 50px;
    height: 50px;
    margin: 90px auto;
    color: navy;
    display: block;
  `;

  return (
    <Wrapper>
      <Spinner className="spinner-grow" animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </Wrapper>
  );
};

export default Loader;
