import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const lightTheme = createTheme({
  typography: {
    h1: {
      fontSize: "2.0rem",
      lineHeight: 1.2,
    },
  },
});

export default responsiveFontSizes(lightTheme);
