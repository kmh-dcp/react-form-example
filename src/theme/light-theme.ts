import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import AppTheme from "./theme.ts";

const lightTheme = createTheme({
  ...AppTheme,
});

export default responsiveFontSizes(lightTheme);
