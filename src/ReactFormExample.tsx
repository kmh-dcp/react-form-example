import { useState } from "react";
import type {
  ChangeEventHandler,
  Dispatch,
  FocusEventHandler,
  SetStateAction,
} from "react";
import { Stack, TextField } from "@mui/material";

export type FormExampleData = {
  firstName?: string;
  lastName?: string;
};

function ReactFormExample({ ...formFields }: FormExampleData) {
  const [firstName, setFirstName] = useState(formFields.firstName ?? "");
  const [lastName, setLastName] = useState(formFields.lastName ?? "");

  const onChange = (
    setter: Dispatch<SetStateAction<string>>,
  ): ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> => {
    return (event) => {
      setter(event.target.value);
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
        value={firstName}
        sx={sxFirstName}
        onChange={onChange(setFirstName)}
        onBlur={onBlur}
      />
      <TextField
        label="Last name"
        value={lastName}
        sx={sxLastName}
        onChange={onChange(setLastName)}
        onBlur={onBlur}
        required
      />
    </Stack>
  );
}

export default ReactFormExample;
