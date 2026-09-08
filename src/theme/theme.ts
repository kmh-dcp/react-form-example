import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    h1: {
      fontSize: "2.0rem",
      lineHeight: 1.2,
    },
  },
});

export default responsiveFontSizes(theme);
