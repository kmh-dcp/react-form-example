import { useState } from "react";
import type { ChangeEventHandler, FocusEventHandler } from "react";
import { Stack, TextField } from "@mui/material";

export type FormExampleData = {
  firstName?: string;
  lastName?: string;
};

function ReactFormExample({ ...formFields }: FormExampleData) {
  const [data, setData] = useState<FormExampleData>({
    firstName: formFields.firstName ?? "",
    lastName: formFields.lastName ?? "",
  });

  const onChange = (
    key: string,
  ): ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> => {
    return (event) => {
      setData({ ...data, [key]: event.target.value });
    };
  };

  const onBlur:
    | FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined = () => {
    // TODO: propogate values back to parent component
  };

  const sxFirstName = {
    width: 300,
  };

  const sxLastName = {
    flexGrow: 1,
  };

  return (
    <Stack direction="row">
      <TextField
        label="First name"
        value={data.firstName}
        sx={sxFirstName}
        onChange={onChange("firstName")}
        onBlur={onBlur}
      />
      <TextField
        label="Last name"
        value={data.lastName}
        sx={sxLastName}
        onChange={onChange("lastName")}
        onBlur={onBlur}
        required
      />
    </Stack>
  );
}

export default ReactFormExample;
