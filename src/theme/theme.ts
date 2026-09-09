import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const increment = 16;

const theme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: 1.25 * increment,
          padding: increment,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: "12px",
          marginLeft: 0,
          paddingLeft: 10.66,
          paddingTop: 1,
        },
      },
    },
    MuiInputLabel: {
      defaultProps: {
        shrink: true,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          "&.MuiInputLabel-shrink": {
            backgroundColor:
              theme.palette.mode === "light"
                ? theme.palette.background.paper
                : "#1e1e1e",
            marginLeft: -5,
            paddingLeft: 4,
            paddingRight: 3,
          },
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0.5 * increment,
        },
      },
    },
    MuiStack: {
      defaultProps: {
        spacing: 1,
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
