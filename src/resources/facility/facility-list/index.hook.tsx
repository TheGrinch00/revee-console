import { selectors } from "redux-store";
import { useSelector } from "react-redux";
import { useIsAdmin } from "hooks/useIsAdmin";

export const useFacilityList = () => {
  const isCreateDialogOpen = useSelector(
    selectors.getIsFacilityCreateDialogOpen
  );
  const isAdmin = useIsAdmin();
  return { isCreateDialogOpen, isAdmin };
};
