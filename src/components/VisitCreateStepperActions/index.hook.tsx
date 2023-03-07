import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormState } from "react-final-form";
import { actions, selectors } from "redux-store";
import { Theme, useTheme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      marginTop: "1em!important",
    },
  })
);

const useVisitCreateStepperActions = () => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const classes = useMemo(() => ({}), []);

  const dispatch = useDispatch();

  const { values: visitCreateFormValues } = useFormState();
  const step = useSelector(selectors.getVisitCreateCurrentStep);

  const isVisitCreateStepperNextButtonDisabled = useMemo(() => {
    switch (step) {
      case 0:
        return !visitCreateFormValues.MemberId;
      case 1:
        return (
          !visitCreateFormValues.EmployeeId || !visitCreateFormValues.PositionId
        );
      case 2:
        return !visitCreateFormValues.RealDate;
      case 3:
        return false;
      case 4:
        return false;
    }
  }, [step, visitCreateFormValues]);

  const onNextButtonClicked = useCallback(() => {
    if (step === 4) {
      dispatch(actions.setVisitCreateStep(0));
    } else {
      dispatch(actions.setVisitCreateStep((step + 1) as 1 | 2 | 3 | 4));
    }
  }, [step, dispatch]);

  const onBackButtonPressed = useCallback(
    () =>
      step !== 0
        ? dispatch(actions.setVisitCreateStep((step - 1) as 0 | 1 | 2 | 3))
        : null,
    [step, dispatch]
  );

  return {
    styles,
    classes,
    step,
    onNextButtonClicked,
    onBackButtonPressed,
    isVisitCreateStepperNextButtonDisabled,
  };
};

export default useVisitCreateStepperActions;
