import { Stack, TextField, Typography } from "@mui/material";
import {
  type ChangeEventHandler,
  type FocusEventHandler,
  useState,
} from "react";

export type LocationFieldsData = {
  city?: string;
  state?: string;
  country?: string;
};

type LocationFieldsProps = {
  didChangeValue?: (key: keyof LocationFieldsData, value: string) => void;
  disabledFields?: (keyof LocationFieldsData)[];
  formErrors?: Record<string, string>;
};

function LocationFields({
  didChangeValue,
  disabledFields,
  formErrors,
  ...formFields
}: LocationFieldsProps & LocationFieldsData) {
  // These are the "ground truth" states of these form fields, though you can pass in initial values via props.
  const [data, setData] = useState<LocationFieldsData>({
    city: formFields.city ?? "",
    state: formFields.state ?? "",
    country: formFields.country ?? "",
  });

  // Helper

  const isDisabled = (key: keyof LocationFieldsData): boolean => {
    return disabledFields?.includes(key) ?? false;
  };

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

    const key = event.target.name as keyof LocationFieldsData;
    const oldValue = formFields[key];
    const newValue = data[key];
    if (oldValue !== newValue) {
      didChangeValue(key, newValue!);
    }
    return;
  };

  // Styles

  const sxCity = {
    flexGrow: 1,
  };

  const sxState = {
    width: 200,
  };

  const sxCountry = {
    width: 200,
  };

  // Component

  return (
    <>
      <Typography>Location</Typography>
      <Stack direction="row">
        <TextField
          label="City"
          name="city"
          value={data.city}
          helperText={formErrors?.city}
          error={!!formErrors?.city}
          sx={sxCity}
          onChange={onChange}
          onBlur={onBlur}
          disabled={isDisabled("city")}
        />
        <TextField
          label="State"
          name="state"
          value={data.state}
          helperText={formErrors?.state}
          error={!!formErrors?.state}
          sx={sxState}
          onChange={onChange}
          onBlur={onBlur}
          disabled={isDisabled("state")}
          placeholder={isDisabled("state") ? "Select country" : undefined}
        />
        <TextField
          label="Country"
          name="country"
          value={data.country}
          helperText={formErrors?.country}
          error={!!formErrors?.country}
          sx={sxCountry}
          onChange={onChange}
          onBlur={onBlur}
          disabled={isDisabled("country")}
        />
      </Stack>
    </>
  );
}

export default LocationFields;
