import { Stack, TextField } from "@mui/material";

function ReactFormExample() {
  const sxFirstName = {
    width: 300,
  };

  const sxLastName = {
    flexGrow: 1,
  };

  return (
    <Stack direction="row">
      <TextField label="First name" sx={sxFirstName} />
      <TextField label="Last name" sx={sxLastName} required />
    </Stack>
  );
}

export default ReactFormExample;
