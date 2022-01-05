import React from "react";
//import { Alert } from 'react-bootstrap';
import Alert from "@mui/material/Alert";

const Message = ({ variant = "info", children }) => {
  return <Alert severity={variant}>{children}</Alert>;
};

export default Message;
