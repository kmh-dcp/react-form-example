import { useState } from "react";
import {
  Box,
  Paper,
  Stack,
  Switch,
  ThemeProvider,
  Typography,
} from "@mui/material";
import ReactFormExample from "./ReactFormExample";
import type { SxProps, Theme } from "@mui/material";
import type { ChangeEvent } from "react";
import LightTheme from "./theme/light-theme.ts";
import DarkTheme from "./theme/dark-theme.ts";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";

function App() {
  const [theme, setTheme] = useState<Theme>(LightTheme);

  const sxViewport: SxProps<Theme> = {
    marginY: (theme: Theme) => theme.spacing(1),
  };

  const sxPaper: SxProps = {
    textAlign: "left",
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const toggle = event.target.checked;
    setTheme(toggle ? LightTheme : DarkTheme);
  };

  const switchProps = {
    slotProps: {
      input: {
        "aria-label": "controlled",
      },
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack sx={sxViewport}>
        <Box>
          <Switch onChange={onChange} {...switchProps} defaultChecked />
        </Box>
        <Paper aria-label="paper" sx={sxPaper}>
          <Typography aria-label="header" variant="h1" className="hugContents">
            React Form Example
          </Typography>
          <ReactFormExample />
        </Paper>
      </Stack>
    </ThemeProvider>
  );
}

export default App;
