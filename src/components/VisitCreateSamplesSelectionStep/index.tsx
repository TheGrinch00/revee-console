import { BooleanSampleInput, VisitCreateStepContainer } from "components";
import NumericSampleInput from "components/NumericSampleInput";
import { memo } from "react";
import { useVisitCreateSamplesSelectionStep } from "./index.hook";
import { Grid } from "@material-ui/core";

const VisitCreateSamplesSelectionStep = () => {
  const { samples } = useVisitCreateSamplesSelectionStep();

  return (
    <VisitCreateStepContainer stepName="Campioni gratuiti">
      <Grid container spacing={4} alignItems="center">
        {samples.map((sample) => (
          <Grid item md={3} lg={2} xl={1}>
            {sample.type === "bool" ? (
              <BooleanSampleInput sample={sample} />
            ) : (
              <NumericSampleInput sample={sample} />
            )}
          </Grid>
        ))}
      </Grid>
    </VisitCreateStepContainer>
  );
};

export default memo(VisitCreateSamplesSelectionStep);
