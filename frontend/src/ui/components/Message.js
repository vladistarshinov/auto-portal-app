import React, { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const Message = ({ variant = "info", children }) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const handler = setTimeout(() => {
      setOpen(false);
    }, 2000);

    return () => {
      clearTimeout(handler);
    };
  }, [open]);

  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          severity={variant}
        >
          {children}
        </Alert>
      </Collapse>
    </Stack>
  );
};

export default Message;
