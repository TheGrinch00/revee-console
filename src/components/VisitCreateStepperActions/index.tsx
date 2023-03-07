import { Button } from "@material-ui/core";
import { Grid } from "@mui/material";
import { memo } from "react";
import useVisitCreateStepperActions from "./index.hook";

export interface VisitCreateStepperActionsProps {}

const VisitCreateStepperActions = (props: VisitCreateStepperActionsProps) => {
  const {
    styles,
    step,
    onNextButtonClicked,
    onBackButtonPressed,
    isVisitCreateStepperNextButtonDisabled,
  } = useVisitCreateStepperActions();
  return (
    <Grid container spacing={2} className={styles.mainContainer}>
      {step !== 0 && (
        <Grid item>
          <Button
            color="primary"
            variant="outlined"
            onClick={onBackButtonPressed}
          >
            Indietro
          </Button>
        </Grid>
      )}
      {step !== 4 && (
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            onClick={onNextButtonClicked}
            disabled={isVisitCreateStepperNextButtonDisabled}
          >
            Avanti
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default memo(VisitCreateStepperActions);
