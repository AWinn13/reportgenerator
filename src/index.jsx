import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./output.css";
import App from './App.jsx';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


const theme = createTheme({
  palette: {
    davygray: {
      main: "#545863",
      contrastText: "#ffffff",
      light: "#b8bbc3",
      dark: "#111214",
    },
    lavenderblush: {
      main: "#eee5e9",
      contrastText: "#39252e",
      light: "#fcfafb",
      dark: "#39252e",
    },
    amaranth: {
      main: "#d1495b",
      contrastText: "#ffffff",
      light: "#f6dade",
      dark: "#2d0b10",
    },
    mossgreen: {
      main: "#84894a",
      contrastText: "#ffffff",
      light: "#e8ead8",
      dark: "#1a1b0f",
    },
    tiffanyblue: {
      main: "#7fd1b9",
      contrastText: "#ffffff",
      light: "#e6f6f1",
      dark: "#123128",
    },
  },
});
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);