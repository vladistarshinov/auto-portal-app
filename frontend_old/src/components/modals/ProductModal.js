import React from "react";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ModalWrapper from "../../ui/components/ModalWrapper";
import Loader from "../../ui/components/Loader";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

const EditProductModal = ({
  type,
  open,
  setOpen,
  productData,
  setProductData,
  action,
  uploadFileHandler,
  uploading,
}) => {
  const handleSubmit = () => {
    action();
    setOpen(false);
  };

  const CenterLayout = styled(Box)({
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  });

  const Input = styled("input")({
    display: "none",
  });

  return (
    <>
      <ModalWrapper
        open={open}
        setOpen={setOpen}
        title={type === "create" ? "Добавление продукта" : "Изменение продукта"}
      >
        <Grid>
          <FormControl sx={{ width: "100%" }}>
            <TextField
              type="name"
              label="Название товара"
              fullWidth
              sx={{ my: 2 }}
              id="standard-basic"
              variant="standard"
              placeholder="Введите название товара"
              value={productData?.name}
              onChange={(e) =>
                setProductData({ ...productData, name: e.target.value })
              }
            />
          </FormControl>
          <FormControl sx={{ width: "100%" }}>
            <TextField
              type="text"
              label="Описание товара"
              multiline
              minRows={3}
              fullWidth
              sx={{ my: 2 }}
              id="standard-basic"
              variant="standard"
              placeholder="Введите описание товара"
              value={productData?.description}
              onChange={(e) =>
                setProductData({ ...productData, description: e.target.value })
              }
            />
          </FormControl>
          {productData?.image && (
            <Box
              component="img"
              sx={{ width: "100%" }}
              src={productData?.image}
              alt={productData.name}
            />
          )}
          <FormControl sx={{ width: "100%" }}>
            <label htmlFor="contained-button-file">
              <Input
                accept="image/*"
                id="contained-button-file"
                type="file"
                onChange={uploadFileHandler}
              />
              <Button
                variant="outlined"
                color="inherit"
                component="span"
                sx={{ marginLeft: "20px" }}
              >
                Upload
              </Button>
            </label>
            {uploading && <Loader />}
          </FormControl>
          <Grid container>
            <Grid item xs={6} sm={6} md={6}>
              <FormControl>
                <TextField
                  type="number"
                  label="Цена"
                  sx={{ my: 2 }}
                  id="standard-basic"
                  variant="standard"
                  placeholder="Введите цену"
                  value={productData?.price}
                  onChange={(e) =>
                    setProductData({ ...productData, price: e.target.value })
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <FormControl>
                <TextField
                  type="number"
                  label="Количество"
                  sx={{ my: 2 }}
                  id="standard-basic"
                  variant="standard"
                  placeholder="Введите кол-во"
                  value={productData?.countInStock}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      countInStock: e.target.value,
                    })
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6} sm={6} md={6}>
              <FormControl>
                <TextField
                  type="text"
                  label="Категория"
                  fullWidth
                  sx={{ my: 2 }}
                  id="standard-basic"
                  variant="standard"
                  placeholder="Введите категорию"
                  value={productData?.category}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      category: e.target.value,
                    })
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <FormControl>
                <TextField
                  type="text"
                  label="Бренд"
                  fullWidth
                  sx={{ my: 2 }}
                  id="standard-basic"
                  variant="standard"
                  placeholder="Введите бренд"
                  value={productData?.brand}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      brand: e.target.value,
                    })
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
          <CenterLayout>
            <Button onClick={handleSubmit} variant="outlined" color="inherit">
              {type === "create" ? "Создать" : "Обновить"}
            </Button>
          </CenterLayout>
        </Grid>
      </ModalWrapper>
    </>
  );
};

export default EditProductModal;
