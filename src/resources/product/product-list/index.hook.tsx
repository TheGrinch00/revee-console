import { selectors } from "redux-store";
import { useSelector } from "react-redux";
import { useIsAdmin } from "hooks/useIsAdmin";

export const useProductList = () => {
  const isCreateDialogOpen = useSelector(
    selectors.getIsProductCreateDialogOpen
  );
  const isAdmin = useIsAdmin();
  return { isCreateDialogOpen, isAdmin };
};
