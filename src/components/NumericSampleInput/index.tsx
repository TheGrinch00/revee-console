import { memo } from "react";
import { useNumericSampleInput } from "./index.hook";
import { Sample } from "models/Sample";
import { TextField, Grid, Typography } from "@material-ui/core";

interface NumericSampleInputProps {
  sample: Sample;
}

const NumericSampleInput = ({ sample }: NumericSampleInputProps) => {
  const { styles, onValueChanged, currentValue } = useNumericSampleInput(
    sample.id
  );

  return (
    <Grid container alignItems="flex-start" direction="column">
      <Grid item>
        <Typography variant="h4" color="secondary">
          {sample.name}
        </Typography>
      </Grid>
      <Grid item>
        <TextField
          type="number"
          variant="outlined"
          color="primary"
          className={styles.inputBgWhite}
          value={currentValue}
          onChange={onValueChanged}
        />
      </Grid>
    </Grid>
  );
};

export default memo(NumericSampleInput);
