import { memo } from "react";
import { Grid } from "@mui/material";
import { TextInput, DateTimeInput } from "react-admin";

import { useVisitCreateGeneralDataInput } from "./index.hook";

import { VisitCreateStepContainer } from "components";

const VisitCreateGeneralDataInput = () => {
  const { styles } = useVisitCreateGeneralDataInput();

  return (
    <VisitCreateStepContainer stepName="Dati generali">
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
    </VisitCreateStepContainer>
  );
};

export default memo(VisitCreateGeneralDataInput);
