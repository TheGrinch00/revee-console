import { useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectors, actions } from "../../redux-store";

export const useProvinceRow = (shortName: string) => {
  const dispatch = useDispatch();
  const reduxDivisions = useSelector(selectors.getSelectedProvinces);

  const isActive = useMemo(
    () => reduxDivisions.includes(shortName),
    [reduxDivisions, shortName]
  );

  const onSwitched = useCallback(
    () => dispatch(actions.toggleProvinces(shortName)),
    [shortName, dispatch]
  );

  return { isActive, onSwitched };
};
