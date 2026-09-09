import { useState } from "react";
import type { ChangeEventHandler, FocusEventHandler } from "react";
import { Stack, TextField } from "@mui/material";

export type FormExampleData = {
  firstName?: string;
  lastName?: string;
};

export type FormExampleProps = {
  didChangeValue?: (key: keyof FormExampleData, value: string) => void;
};

function ReactFormExample({
  didChangeValue,
  ...formFields
}: FormExampleProps & FormExampleData) {
  const [data, setData] = useState<FormExampleData>({
    firstName: formFields.firstName ?? "",
    lastName: formFields.lastName ?? "",
  });

  const onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
    event,
  ) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const onBlur:
    FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined = (
    event,
  ) => {
    if (!didChangeValue) return;

    const key = event.target.name as keyof FormExampleData;
    const oldValue = formFields[key];
    const newValue = data[key];
    if (oldValue !== newValue) {
      didChangeValue(key, newValue!);
    }
    return;
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
        name="firstName"
        value={data.firstName}
        sx={sxFirstName}
        onChange={onChange}
        onBlur={onBlur}
      />
      <TextField
        label="Last name"
        name="lastName"
        value={data.lastName}
        sx={sxLastName}
        onChange={onChange}
        onBlur={onBlur}
        required
      />
    </Stack>
  );
}

export default ReactFormExample;
