import { Paper, Typography } from "@mui/material";
import "./App.css";

function App() {
  const sxPaper = {
    textAlign: "left",
  };

  return (
    <Paper aria-label="paper" sx={sxPaper}>
      <Typography aria-label="header" variant="h1" className="hugContents">
        React Form Example
      </Typography>
    </Paper>
  );
}

export default App;
