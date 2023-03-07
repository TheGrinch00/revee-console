import { memo } from "react";
import { useBooleanSampleInput } from "./index.hook";
import { Sample } from "models/Sample";
import { Grid, Typography, Checkbox } from "@material-ui/core";

interface BooleanSampleInputProps {
  sample: Sample;
}

const BooleanSampleInput = ({ sample }: BooleanSampleInputProps) => {
  const { onValueChanged, currentValue } = useBooleanSampleInput(sample.id);

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Checkbox
          color="primary"
          checked={currentValue}
          onChange={onValueChanged}
        />
      </Grid>
      <Grid item>
        <Typography variant="h4" color="secondary">
          {sample.name}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default memo(BooleanSampleInput);
