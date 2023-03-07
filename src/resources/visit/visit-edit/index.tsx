import React from "react";
import {
  DateTimeInput,
  Edit,
  EditProps,
  FormTab,
  SaveButton,
  TabbedForm,
  TextInput,
  Toolbar,
} from "react-admin";
import { useVisitEdit } from "./index.hook";
import {
  VisitEditProductSelection,
  VisitEditSamplesSelection,
} from "../../../components";

import { Grid } from "@mui/material";
const VisitCreateToolbar = (props: any) => {
  return (
    <Toolbar {...props}>
      <SaveButton label="Save" />
    </Toolbar>
  );
};
export const VisitEdit = (props: EditProps) => {
  const { styles, onSuccessHandle, onFailureHandle } = useVisitEdit(props);

  return (
    <Edit
      {...props}
      onSuccess={onSuccessHandle}
      onFailure={onFailureHandle}
      mutationMode="pessimistic"
    >
      <TabbedForm toolbar={<VisitCreateToolbar />}>
        <FormTab label="Dati generali">
          <Grid
            container
            spacing={1}
            justifyContent="space-between"
            className={styles.fullWidth}
          >
            <Grid item xs={9} sm={9} md={9}>
              <TextInput
                className={styles.inputBgWhite}
                fullWidth
                source="Name"
                label="Nome (opzionale)"
                variant="outlined"
              ></TextInput>
            </Grid>
            <Grid item xs={4} sm={4} md={3}>
              <DateTimeInput
                className={styles.inputBgWhite}
                fullWidth
                source="RealDate"
                label="Data e Ora"
                variant="outlined"
              ></DateTimeInput>
            </Grid>
            <Grid item xs={9} sm={12} md={12}>
              <TextInput
                className={styles.inputBgWhite}
                fullWidth
                source="Report"
                label="Annotazioni (opzionale)"
                variant="outlined"
                multiline
                minRows={3}
              />
            </Grid>
          </Grid>
        </FormTab>
        <FormTab label="Prodotti di interesse">
          <VisitEditProductSelection />
        </FormTab>
        <FormTab label="Campioni">
          <VisitEditSamplesSelection />
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};
