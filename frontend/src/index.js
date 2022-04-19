import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { CssBaseline } from "@mui/material";
import App from "./App";
import { ThemeProvider } from "@mui/material";
import { StylesProvider } from "@mui/styles";
import * as serviceWorker from "./serviceWorker";
import theme from "./theme";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </StylesProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
