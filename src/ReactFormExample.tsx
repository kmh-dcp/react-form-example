import { Button } from "@mui/material";
import PersonFields, { type PersonFieldsData } from "./PersonFields";

export type FormExampleData = PersonFieldsData & {
  city?: string;
  state?: string;
};

export type FormExampleProps = {
  didChangeValue?: (key: keyof FormExampleData, value: string) => void;
  onSubmit?: (data: FormExampleData) => void;
  formErrors?: Record<string, string>;
};

function ReactFormExample({
  didChangeValue,
  onSubmit,
  formErrors,
  ...formFields
}: FormExampleProps & FormExampleData) {
  const personData: PersonFieldsData = {
    firstName: formFields.firstName,
    lastName: formFields.lastName,
  };

  const formData: FormExampleData = {
    ...personData,
  };

  // Component

  return (
    <>
      <PersonFields
        {...personData}
        didChangeValue={didChangeValue}
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
