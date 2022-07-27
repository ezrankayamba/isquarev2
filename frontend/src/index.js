import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import axios from "axios";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
const theme = createTheme({
  palette: {
    primary: {
      main: "#075ED9",
    },
    secondary: {
      main: "#E33E7F",
    },
  },
});

axios.defaults.withCredentials = true;
ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
