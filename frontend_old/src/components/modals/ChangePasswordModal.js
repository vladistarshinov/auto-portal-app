import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ModalWrapper from "../../ui/components/ModalWrapper";
import { styled } from "@mui/material/styles";
import { updateUserProfile } from "../../redux/actions/user.actions";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Message from "../../ui/components/Message";
const ChangePasswordModal = ({ open, setOpen, detailId }) => {
  const [msg, setMsg] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const updatingUserProfile = useSelector((state) => state.updatingUserProfile);
  const { error, success } = updatingUserProfile;

  const handleClickShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const dispatch = useDispatch();

  const CenterLayout = styled(Box)({
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
    marginBottom: "20px",
  });

  useEffect(() => {
    if (success) {
      setOpen(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  }, [success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMsg("Пароли не совпадают");
    } else {
      dispatch(updateUserProfile({ id: detailId, oldPassword, newPassword }));
    }
  };

  return (
    <>
      {/* Modal */}
      <ModalWrapper open={open} setOpen={setOpen} title={"Изменение пароля"}>
        {error && <Message variant="error">{msg || error}</Message>}
        <Grid>
          <FormControl sx={{ mt: 3, width: "100%" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Пароль
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              placeholder="Введите пароль"
              type={showOldPassword ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowOldPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showOldPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <FormControl sx={{ mt: 3, width: "100%" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Пароль
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              placeholder="Введите пароль"
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowNewPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <FormControl sx={{ mt: 3, width: "100%" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Подтверждение пароля
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              fullWidth
              placeholder="Подтвердите пароль"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          <CenterLayout>
            <Button onClick={submitHandler} variant="outlined" color="inherit">
              Обновить
            </Button>
          </CenterLayout>
        </Grid>
      </ModalWrapper>
    </>
  );
};

export default ChangePasswordModal;
