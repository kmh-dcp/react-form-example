import { Stack, TextField, Typography } from "@mui/material";
import {
  type ChangeEventHandler,
  type FocusEventHandler,
  useState,
} from "react";
import { type StandardProps } from "./SharedUtils.ts";

export type PersonFieldsData = {
  firstName?: string;
  lastName?: string;
};

type PersonFieldsProps = {
  didChangeValue?: (key: keyof PersonFieldsData, value: string) => void;
  formErrors?: Record<string, string>;
};

function PersonFields({
  "aria-label": ariaLabel,
  didChangeValue,
  formErrors,
  ...formFields
}: PersonFieldsProps & PersonFieldsData & StandardProps) {
  // This is the "ground truth" state of these fields, though you can pass in initial values via props.
  const [data, setData] = useState<PersonFieldsData>({
    firstName: formFields.firstName ?? "",
    lastName: formFields.lastName ?? "",
  });

  // Actions

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

    const key = event.target.name as keyof PersonFieldsData;
    const oldValue = formFields[key] ?? "";
    const newValue = data[key];
    if (oldValue !== newValue) {
      didChangeValue(key, newValue!);
    }
    return;
  };

  // Styles

  const sxFirstName = {
    width: 300,
  };

  const sxLastName = {
    flexGrow: 1,
  };

  // Component

  return (
    <Stack aria-label={ariaLabel}>
      <Typography>Person</Typography>
      <Stack direction="row">
        <TextField
          label="First name"
          name="firstName"
          value={data.firstName}
          helperText={formErrors?.firstName}
          error={!!formErrors?.firstName}
          sx={sxFirstName}
          onChange={onChange}
          onBlur={onBlur}
        />
        <TextField
          label="Last name"
          name="lastName"
          value={data.lastName}
          helperText={formErrors?.lastName}
          error={!!formErrors?.lastName}
          sx={sxLastName}
          onChange={onChange}
          onBlur={onBlur}
          required
        />
      </Stack>
    </Stack>
  );
}

export default PersonFields;
