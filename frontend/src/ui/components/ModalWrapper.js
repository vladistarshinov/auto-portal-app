import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";

const ModalWrapper = ({ open, setOpen, title, children }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-rounded": {
            borderRadius: 3,
          },
          "& .MuiDialog-paper": {
            "&::-webkit-scrollbar": {
              width: 6,
              height: 6,
            },
            "&::-webkit-scrollbar-button": {
              backgroundColor: "transparent",
            },
            "&::-webkit-scrollbar-track-piece": {
              backgroundColor: "transparent",
            },
            "&::-webkit-scrollbar-thumb:vertical": {
              borderRadius: 16,
              height: 4,
              backgroundColor: "#C0C0C0",
            },
            "&::-webkit-scrollbar-thumb:horizontal": {
              borderRadius: 16,
              height: 4,
              backgroundColor: "#C0C0C0",
            },
          },
        }}
      >
        <div sx={{ padding: 15 }}>
          <div
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "center",
              position: "relative",
              paddingTop: 21,
            }}
          >
            <CloseIcon
              onClick={handleClose}
              sx={{
                cursor: "pointer",
                position: "absolute",
                top: 2,
                right: 2,
              }}
              src={CloseIcon}
              alt="close"
            />
            <DialogTitle
              sx={{
                padding: "12px 16px",
              }}
            >
              <h5
                sx={{
                  fontSize: 22,
                  lineHeight: "28px",
                }}
              >
                {title}
              </h5>
            </DialogTitle>
          </div>
          <DialogContent sx={{ padding: "0 16px" }}>{children}</DialogContent>
        </div>
      </Dialog>
    </>
  );
};

export default ModalWrapper;
