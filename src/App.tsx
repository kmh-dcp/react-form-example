import { useState } from "react";
import {
  Box,
  Chip,
  Paper,
  Stack,
  Switch,
  ThemeProvider,
  Typography,
} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import ReactFormExample, { type FormExampleData } from "./ReactFormExample";
import type { SxProps, Theme } from "@mui/material";
import type { ChangeEvent } from "react";
import LightTheme from "./theme/light-theme.ts";
import DarkTheme from "./theme/dark-theme.ts";
import CssBaseline from "@mui/material/CssBaseline";
import { type StandardProps } from "./SharedUtils.ts";
import "./App.css";

// TODO: Refactor ThemeProvider out into parent component for testability

type AppProps = {
  darkTheme?: boolean;
  themeDidChange?: (theme: string) => void;
  showFormWarning?: boolean;
};

function App({
  themeDidChange,
  "aria-label": ariaLabel,
  ...props
}: AppProps & StandardProps) {
  const [theme, setTheme] = useState<Theme>(
    props.darkTheme ? DarkTheme : LightTheme,
  );
  const [formData, setFormData] = useState<FormExampleData>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showFormWarning, setShowFormWarning] = useState<boolean>(
    props.showFormWarning ?? false,
  );

  // Actions

  const switchDidToggle = (event: ChangeEvent<HTMLInputElement>) => {
    const toggle = event.target.checked;
    setTheme(toggle ? LightTheme : DarkTheme);
    if (themeDidChange) {
      themeDidChange(toggle ? "light" : "dark");
    }
  };

  const didChangeValue = (key: keyof FormExampleData, value: string) => {
    setFormData({ ...formData, [key]: value });
    if (key === "lastName" && value.length) {
      setFormErrors({});
      setShowFormWarning(false);
    }
    // TODO: perform validations
  };

  const onSubmit = (data: FormExampleData) => {
    // TODO: process form submission here
    console.log("[onSubmit]", data);
    setFormErrors({ lastName: "This is an invalid last name." });
    setShowFormWarning(true);
  };

  // Styles

  const sxViewport: SxProps<Theme> = {
    marginY: (theme: Theme) => theme.spacing(1),
  };

  const sxPaper: SxProps = {
    textAlign: "left",
  };
  const switchProps = {
    slotProps: {
      input: {
        "aria-label": "controlled",
      },
    },
  };

  // Component

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack aria-label={ariaLabel} sx={sxViewport}>
        <Box>
          <Switch
            aria-label="theme-switch"
            onChange={switchDidToggle}
            {...switchProps}
            defaultChecked
          />
        </Box>
        <Paper aria-label="paper" sx={sxPaper}>
          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <Typography
              aria-label="header"
              variant="h1"
              className="hugContents"
            >
              React Form Example
            </Typography>
            {showFormWarning && (
              <Chip
                icon={<ErrorIcon />}
                label="Please fix form errors below"
                color="error"
                onDelete={() => {
                  setShowFormWarning(false);
                }}
              />
            )}
          </Stack>
          <ReactFormExample
            {...formData}
            didChangeValue={didChangeValue}
            onSubmit={onSubmit}
            formErrors={formErrors}
          />
        </Paper>
      </Stack>
    </ThemeProvider>
  );
}

export default App;
