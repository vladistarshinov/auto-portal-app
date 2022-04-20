import React from "react";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ModalWrapper from "../../ui/components/ModalWrapper";
import { styled } from "@mui/material/styles";

const EditUserModal = ({ open, setOpen, userData, setUserData, action }) => {
  const handleSubmit = () => {
    action();
    setOpen(false);
  };

  const CenterLayout = styled(Box)({
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  });

  return (
    <>
      {/* Modal */}
      <ModalWrapper
        open={open}
        setOpen={setOpen}
        title={"Изменение данных пользователя"}
      >
        <Grid>
          <FormControl sx={{ width: "100%" }}>
            <TextField
              type="name"
              label="Имя"
              fullWidth
              sx={{ my: 2 }}
              id="standard-basic"
              variant="standard"
              placeholder="Введите имя и фамилию"
              value={userData?.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
          </FormControl>
          <FormControl sx={{ width: "100%" }}>
            <TextField
              type="email"
              label="Email"
              fullWidth
              sx={{ my: 2 }}
              id="standard-basic"
              variant="standard"
              placeholder="Введите email"
              value={userData?.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </FormControl>
          <FormControl
            variant="standard"
            style={{
              width: "200px",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <InputLabel id="demo-simple-select-standard-label">
              Админ?
            </InputLabel>
            <Select
              value={userData?.isAdmin}
              sx={{ my: 2 }}
              onChange={(e) =>
                setUserData({ ...userData, isAdmin: e.target.value })
              }
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="Админ?"
            >
              <MenuItem value="true">да</MenuItem>
              <MenuItem value="false">нет</MenuItem>
            </Select>
          </FormControl>
          <CenterLayout>
            <Button onClick={handleSubmit} variant="outlined" color="inherit">
              Обновить
            </Button>
          </CenterLayout>
        </Grid>
      </ModalWrapper>
    </>
  );
};

export default EditUserModal;
