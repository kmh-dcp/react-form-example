import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const increment = 16;

const theme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxSizing: "border-box",
          padding: increment,
        },
      },
    },
  },
  shape: {
    borderRadius: increment,
  },
  spacing: increment,
  typography: {
    h1: {
      fontSize: "2.0rem",
      lineHeight: 1.2,
    },
  },
});

export default responsiveFontSizes(theme);
