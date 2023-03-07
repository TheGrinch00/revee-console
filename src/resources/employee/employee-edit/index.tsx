import React from "react";
import { DateInput, Edit, EditProps, SimpleForm, TextInput } from "react-admin";

export const EmployeeEdit = (props: EditProps) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput color="secondary" source="EmployeeName" variant="outlined" />
        <TextInput
          color="secondary"
          source="EmployeeSurname"
          variant="outlined"
        />
        <TextInput
          color="secondary"
          source="EmployeePhoneNumber"
          variant="outlined"
        />
        <TextInput
          color="secondary"
          source="EmployeeEmail"
          variant="outlined"
        />
        <DateInput
          color="secondary"
          source="EmployeeBirthDate"
          variant="outlined"
        />
      </SimpleForm>
    </Edit>
  );
};
