import { createTheme } from "@mui/material";

export const theme = createTheme(
  {
    palette: {
      //@ts-ignore
      type: 'light',
      primary: {
        main: '#ffc400',
        dark: '#D48A00'
      },
      secondary: {
        main: '#6D6A75',
        light: '#BFBDC1',
        dark: '#37323E'
      },
      white: {
        main: '#ffffff'
      }
    },
    //@ts-ignore
    text: {
      primary: '#000000',
      secondary: '#ffffff'
    },
    typography: {
      fontFamily: 'Rubik',
    },
    drawerPaper: {
      width: "inherit",
      paddingTop: 0 
    },
  }
);