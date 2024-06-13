import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from './App.jsx';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


const theme = createTheme({
  typography: {
    fontSize: 18,
    fontWeightBold: 700,
  },
  palette: {
    background: {
      default: "#91b0b3"
    },
    davygray: {
      main: "#545454",
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
    primary: {
      main: '#c9c9ee', // periwinkle DEFAULT
      100: '#151543',
      200: '#2a2a85',
      300: '#4343c4',
      400: '#8686d9',
      500: '#c9c9ee',
      600: '#d4d4f1',
      700: '#dedef5',
      800: '#e9e9f8',
      900: '#f4f4fc',
    },
    secondary: {
      main: '#2a2e45', // space_cadet DEFAULT
      100: '#09090e',
      200: '#11131c',
      300: '#1a1c2a',
      400: '#222538',
      500: '#2a2e45',
      600: '#495077',
      700: '#6b74a4',
      800: '#9ca2c3',
      900: '#ced1e1',
    },
    info: {
      main: '#b6cca1', // celadon DEFAULT
      100: '#24301a',
      200: '#495f33',
      300: '#6d8f4d',
      400: '#92b372',
      500: '#b6cca1',
      600: '#c5d7b5',
      700: '#d4e1c7',
      800: '#e2ebda',
      900: '#f1f5ec',
    },
    warning: {
      main: '#db5461', // indian_red DEFAULT
      100: '#320b0e',
      200: '#63151d',
      300: '#95202b',
      400: '#c72a3a',
      500: '#db5461',
      600: '#e27580',
      700: '#e997a0',
      800: '#f0babf',
      900: '#f8dcdf',
    },
    grey: {
      main: '#5d5d5d', // davy's_gray DEFAULT
      100: '#121212',
      200: '#252525',
      300: '#373737',
      400: '#494949',
      500: '#5d5d5d',
      600: '#7c7c7c',
      700: '#9d9d9d',
      800: '#bebebe',
      900: '#dedede',
    },
    purple: {
      main: '#3a3042', // dark_purple DEFAULT
      100: '#0b090d',
      200: '#17131a',
      300: '#221c27',
      400: '#2e2634',
      500: '#3a3042',
      600: '#61516f',
      700: '#8a759b',
      800: '#b1a3bc',
      900: '#d8d1de',
    },
    slate: {
      main: '#607b7d', // slate_gray DEFAULT
      100: '#131819',
      200: '#263132',
      300: '#39494a',
      400: '#4c6263',
      500: '#607b7d',
      600: '#7c989a',
      700: '#9cb2b3',
      800: '#bdcbcc',
      900: '#dee5e6',
    },
    battleship: {
      main: '#828e82', // battleship_gray DEFAULT
      100: '#1a1c1a',
      200: '#333933',
      300: '#4d554d',
      400: '#677267',
      500: '#828e82',
      600: '#9aa49a',
      700: '#b3bbb3',
      800: '#cdd1cd',
      900: '#e6e8e6',
    },
    sage: {
      main: '#aaae8e', // sage DEFAULT
      100: '#23251b',
      200: '#474935',
      300: '#6a6e50',
      400: '#8d936a',
      500: '#aaae8e',
      600: '#bbbea5',
      700: '#cccebc',
      800: '#ddded2',
      900: '#eeefe9',
    },
    platinum: {
      main: '#e0e0e0', // platinum DEFAULT
      100: '#2d2d2d',
      200: '#5a5a5a',
      300: '#878787',
      400: '#b4b4b4',
      500: '#e0e0e0',
      600: '#e7e7e7',
      700: '#ededed',
      800: '#f3f3f3',
      900: '#f9f9f9',
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