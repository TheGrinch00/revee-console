import React from "react";

import { Grid } from "@material-ui/core";
import {
  Create,
  DateInput,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";
import { useEmployeeCreate } from "./index.hook";

export const EmployeeCreate = (props: any) => {
  const { onSuccesshHandle, EmployeeCreateToolbar, myStyle } =
    useEmployeeCreate();
  return (
    <Create {...props} onSuccess={onSuccesshHandle} title=" ">
      <SimpleForm toolbar={<EmployeeCreateToolbar />}>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          spacing={3}
          className={myStyle.mainContainer}
        >
          <Grid
            container
            direction="column"
            item
            xs={12}
            xl={6}
            md={6}
            sm={6}
            lg={6}
          >
            <TextInput variant="outlined" source="EmployeeName" label="Nome" />
            <TextInput
              color="secondary"
              variant="outlined"
              source="EmployeeSurname"
              label="Cognome"
            />
            <TextInput
              color="secondary"
              variant="outlined"
              source="EmployeePhoneNumber"
              label="Numero di telefono"
            />
            <TextInput
              color="secondary"
              variant="outlined"
              source="EmployeeEmail"
              label="Email"
            />
            <DateInput
              color="secondary"
              variant="outlined"
              source="EmployeeBirthDate"
              label="Data di nascita"
            />
          </Grid>
          <Grid
            container
            direction="column"
            item
            xs={12}
            xl={6}
            md={6}
            sm={6}
            lg={6}
          >
            <TextInput
              color="secondary"
              variant="outlined"
              source="CategoryReason"
              label="Motivazione"
            />
            <TextInput
              multiline
              minRows={5}
              maxRows={5}
              color="secondary"
              variant="outlined"
              source="Comment"
              label="Note"
            />
            <ReferenceInput
              variant="outlined"
              color="secondary"
              source="CategoryId"
              reference="Categories"
              label="Categoria"
            >
              <SelectInput color="secondary" optionText="id" />
            </ReferenceInput>
          </Grid>
        </Grid>
      </SimpleForm>
    </Create>
  );
};
