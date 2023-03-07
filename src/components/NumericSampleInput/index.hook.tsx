import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectors, actions } from "redux-store";
import { Theme, useTheme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inputBgWhite: {
      backgroundColor: "white!important",
      "&>*:not(:last-child):not(:first-child)": {
        backgroundColor: "white!important",
      },
    },
  })
);

export const useNumericSampleInput = (sampleId: number) => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const classes = useMemo(() => ({}), []);

  const dispatch = useDispatch();
  const chosenSamples = useSelector(selectors.getVisitSamples);
  const currentValue = useMemo(
    () =>
      (
        chosenSamples.find((sample) => sample.sampleId === sampleId)
          ?.quantity ?? 0
      ).toString(),
    [chosenSamples, sampleId]
  );

  const onValueChanged = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputString = event.target.value;
      const isPositiveInteger = /^\d+$/.test(inputString);

      if (isPositiveInteger) {
        const inputValue = parseInt(inputString, 10);
        dispatch(actions.setSampleQuantity({ sampleId, quantity: inputValue }));
      } else {
        dispatch(actions.setSampleQuantity({ sampleId, quantity: 0 }));
      }
    },
    [sampleId, dispatch]
  );
  return { styles, classes, currentValue, onValueChanged };
};
