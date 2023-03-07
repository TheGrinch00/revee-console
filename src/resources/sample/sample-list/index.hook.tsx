import { selectors } from "redux-store";
import { useSelector } from "react-redux";
import { useCallback } from "react";
import { useIsAdmin } from "hooks/useIsAdmin";

export const useSampleList = () => {
  const isCreateDialogOpen = useSelector(selectors.getIsSampleCreateDialogOpen);
  const isAdmin = useIsAdmin();

  const renderSampleType = useCallback((record: any) => {
    const type = record.type as "bool" | "number";

    if (type === "bool") {
      return "Sì / No";
    } else if (type === "number") {
      return "Numerico";
    }
  }, []);
  return { isAdmin, renderSampleType, isCreateDialogOpen };
};
