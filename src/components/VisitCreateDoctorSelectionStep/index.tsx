import { memo } from "react";
import { useVisitCreateDoctorSelectionStep } from "./index.hook";
import { Grid, Typography } from "@material-ui/core";
import {
  EmployeeAutocompleteInput,
  VisitCreateStepContainer,
} from "components";
import { FormDataConsumer, SelectInput } from "react-admin";

const PositionsOptionRenderer = (choice: {
  record?: {
    disabled: boolean;
    facility: string;
    id: number;
    shortname: string;
    ward: string;
  };
}) => {
  return (
    <Grid container spacing={2} style={{ width: "100%" }}>
      {choice.record?.ward && (
        <Grid item sm={3}>
          <Typography>{choice.record?.ward}</Typography>
        </Grid>
      )}
      {choice.record?.facility && (
        <Grid item sm={3}>
          <Typography>{choice.record?.facility}</Typography>
        </Grid>
      )}
      {choice.record?.shortname &&
        !choice.record.shortname.includes("undefined") && (
          <Grid item sm={3}>
            <Typography>{choice.record?.shortname}</Typography>
          </Grid>
        )}
      {choice.record?.disabled && (
        <Grid item sm={3}>
          <Typography>Disabilitato</Typography>
        </Grid>
      )}
    </Grid>
  );
};

const VisitCreateDoctorSelectionStep = () => {
  const { allowedDoctors, positions, inputText, styles } =
    useVisitCreateDoctorSelectionStep();

  return (
    <VisitCreateStepContainer stepName="Selezione medico e posizione">
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        style={{ width: "100%" }}
      >
        <EmployeeAutocompleteInput
          choices={allowedDoctors}
          id="EmployeeId"
          name="EmployeeName"
          surname="EmployeeSurname"
          label="Dottore"
        />
        <FormDataConsumer>
          {({ formData, ...rest }) => {
            formData as { EmployeeId: number };

            return (
              formData.EmployeeId && (
                <>
                  <SelectInput
                    variant="outlined"
                    label="Posizione"
                    className={styles.inputBgWhite}
                    fullWidth
                    source="PositionId"
                    choices={positions}
                    optionText={<PositionsOptionRenderer />}
                    inputText={inputText}
                  />
                </>
              )
            );
          }}
        </FormDataConsumer>
      </Grid>
    </VisitCreateStepContainer>
  );
};

export default memo(VisitCreateDoctorSelectionStep);
