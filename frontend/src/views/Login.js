import React, { useState, useEffect } from "react";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/auth.actions";
import Loader from "../ui/components/Loader";
import Message from "../components/Message";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

const Login = ({ history, location }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, redirect, userInfo]);

  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Typography
        variant="inherit"
        component="h2"
        style={{ padding: "1rem 0" }}
      >
        Авторизация
      </Typography>
      {error && <Message variant="error">{error}</Message>}
      {loading && <Loader />}
      <Box sx={{ mt: 3, width: 500 }}>
        <TextField
          sx={{ mt: 3 }}
          label="Email"
          id="outlined-basic"
          fullWidth
          type="email"
          placeholder="Введите email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormControl sx={{ mt: 3, width: "100%" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Box sx={{ textAlign: "center" }}>
          <Button
            variant="outlined"
            color="inherit"
            onClick={submitHandler}
            sx={{
              mt: 3,
              transition: ".5s",
              "&:hover": {
                bgcolor: "primary.dark",
                color: "#fff",
              },
              "&:focus": {
                outline: "none",
              },
            }}
          >
            Войти
          </Button>
        </Box>
      </Box>
      <Box sx={{ py: 3 }}>
        <Box>
          Новый пользователь?{" "}
          <Link
            style={{ color: "navy", textDecoration: "none" }}
            href={redirect ? `/register?redirect=${redirect}` : "/register"}
          >
            Зарегистрироваться
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
