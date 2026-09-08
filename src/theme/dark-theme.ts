import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import AppTheme from "./theme.ts";

const darkTheme = createTheme({
  ...AppTheme,
  palette: {
    mode: "dark",
  },
});

export default responsiveFontSizes(darkTheme);
