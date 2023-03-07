import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions, selectors } from "redux-store";

export const useBooleanSampleInput = (sampleId: number) => {
  const dispatch = useDispatch();
  const chosenSamples = useSelector(selectors.getVisitSamples);
  
  const currentValue = useMemo(
    () => {
      return chosenSamples.find((sample) => sample.sampleId === sampleId)?.quantity
        ? true
        : false
    },
    [chosenSamples, sampleId]
  );

  const onValueChanged = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const switchState = event.target.checked;
      dispatch(
        actions.setSampleQuantity({ sampleId, quantity: switchState ? 1 : 0 })
      );
    },
    [sampleId, dispatch]
  );
  return { currentValue, onValueChanged };
};
