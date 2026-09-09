import { Button } from "@mui/material";
import PersonFields, { type PersonFieldsData } from "./PersonFields";
import LocationFields, { type LocationFieldsData } from "./LocationFields";

export type FormExampleData = PersonFieldsData & LocationFieldsData;

export type FormExampleProps = {
  didChangeValue?: (key: keyof FormExampleData, value: string) => void;
  onSubmit?: (data: FormExampleData) => void;
  disabledFields?: (keyof FormExampleData)[];
  formErrors?: Record<string, string>;
};

function ReactFormExample({
  didChangeValue,
  onSubmit,
  disabledFields,
  formErrors,
  ...formFields
}: FormExampleProps & FormExampleData) {
  const personData: PersonFieldsData = {
    firstName: formFields.firstName,
    lastName: formFields.lastName,
  };

  const locationData: LocationFieldsData = {
    city: formFields.city,
    state: formFields.state,
    country: formFields.country,
  };

  const formData: FormExampleData = {
    ...personData,
    ...locationData,
  };

  // Component

  return (
    <>
      <PersonFields
        {...personData}
        didChangeValue={didChangeValue}
        formErrors={formErrors}
      />
      <LocationFields
        {...locationData}
        didChangeValue={didChangeValue}
        disabledFields={disabledFields}
        formErrors={formErrors}
      />
      <Button
        onClick={() => {
          return onSubmit ? onSubmit(formData) : undefined;
        }}
        variant="contained"
      >
        Submit
      </Button>
    </>
  );
}

export default ReactFormExample;
