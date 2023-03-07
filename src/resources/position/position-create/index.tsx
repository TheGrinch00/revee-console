import { usePositionCreate } from "./index.hook";
import React from "react";
import { Create, SimpleForm, SelectInput, ReferenceInput } from "react-admin";

import { Grid } from "@material-ui/core";
import { Typography } from "@mui/material";

export const PositionCreate = (props: any) => {
  const {
    onSuccesshHandle,
    PositionsCreateToolbar,
    dayOfWeek,
    hourOfDay,
    minuteOfHour,
  } = usePositionCreate();

  return (
    <Create {...props} onSuccess={onSuccesshHandle}>
      <SimpleForm toolbar={<PositionsCreateToolbar />}>
        <Grid direction="row" container style={{ width: "100%" }} spacing={3}>
          <Grid
            container
            item
            direction="column"
            xs={6}
            xl={6}
            md={6}
            sm={6}
            lg={6}
          >
            <Typography>Dati Medico</Typography>{" "}
            <ReferenceInput
              label="Dottore"
              source="EmployeeId"
              reference="Employees"
            >
              <SelectInput
                color="secondary"
                optionText={(choice) =>
                  `${choice.EmployeeName} ${choice.EmployeeSurname}`
                }
              />
            </ReferenceInput>
            <ReferenceInput
              label="Impiego"
              source="EmploymentId"
              reference="Employments"
            >
              <SelectInput color="secondary" optionText="Employment" />
            </ReferenceInput>
            <ReferenceInput
              label="Struttura"
              source="FacilityId"
              reference="Facilities"
            >
              <SelectInput color="secondary" optionText="FacilityName" />
            </ReferenceInput>
            <ReferenceInput label="Reparto" source="WardId" reference="Wards">
              <SelectInput color="secondary" optionText="Ward" />
            </ReferenceInput>
          </Grid>
          <Grid
            container
            item
            direction="column"
            xs={6}
            xl={6}
            md={6}
            sm={6}
            lg={6}
          >
            <Typography>Dati Ricevimento</Typography>
            <SelectInput
              label="Giorno"
              choices={dayOfWeek}
              optionText="day"
              source="MeetingDay"
              optionValue="_id"
            />
            <Grid
              container
              item
              direction="row"
              style={{ width: "100%" }}
              spacing={3}
            >
              <Grid item>
                <SelectInput
                  label="Ora inizio"
                  choices={hourOfDay}
                  optionText="hour"
                  source="MeetingStartHour"
                  optionValue="_id"
                />
              </Grid>
              <Grid item>
                <SelectInput
                  label="Minuti inizio"
                  choices={minuteOfHour}
                  optionText="minute"
                  source="MeetingStartMinute"
                  optionValue="_id"
                />
              </Grid>
            </Grid>
            <Grid
              container
              item
              direction="row"
              style={{ width: "100%" }}
              spacing={3}
            >
              <Grid item>
                <SelectInput
                  label="Ora fine"
                  choices={hourOfDay}
                  optionText="hour"
                  source="MeetingEndHour"
                  optionValue="_id"
                />
              </Grid>
              <Grid item>
                <SelectInput
                  label="Minuti fine"
                  choices={minuteOfHour}
                  optionText="minute"
                  source="MeetingEndMinute"
                  optionValue="_id"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </SimpleForm>
    </Create>
  );
};
