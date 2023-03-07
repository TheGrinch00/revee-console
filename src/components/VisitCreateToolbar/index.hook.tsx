import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../../redux-store";

export const useVisitCreateToolbar = () => {
  const dispatch = useDispatch();
  const step = useSelector(selectors.getVisitCreateCurrentStep);
  
  const onClickHandle = useCallback(() => {
    dispatch(actions.setIsVisitCreateDialogOpen(false));
    dispatch(actions.setVisitCreateStep(0));
  }, [dispatch]);

  return { step, onClickHandle };
};
