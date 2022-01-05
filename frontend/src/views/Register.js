import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "@mui/material/Link";
import { register } from "../redux/actions/auth.actions";
import Loader from "../ui/components/Loader";
import Message from "../components/Message";
import Box from "@mui/material/Box";
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

const Register = ({ history, location }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);

  const { loading, error, userInfo } = userRegister;

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Пароли не совпадают");
    } else {
      dispatch(register(name, email, password));
    }
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
        Регистрация
      </Typography>
      {message && <Message variant="error">{message}</Message>}
      {error && <Message variant="error">{error}</Message>}
      {loading && <Loader />}
      <Box sx={{ mt: 3, width: 500 }}>
        <TextField
          label="Имя"
          id="outlined-basic"
          fullWidth
          type="name"
          placeholder="Введите имя и фамилию"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
            placeholder="Введите пароль"
            type={showPassword ? "text" : "password"}
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
            Зарегистрироваться
          </Button>
        </Box>
      </Box>
      <Box sx={{ py: 3 }}>
        <Box>
          Есть аккаунт?{" "}
          <Link
            style={{ color: "navy", textDecoration: "none" }}
            href={redirect ? `/login?redirect=${redirect}` : "/login"}
          >
            Войти
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
