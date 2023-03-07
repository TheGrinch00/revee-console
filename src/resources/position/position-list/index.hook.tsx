import { selectors } from "redux-store";
import { useSelector } from "react-redux";
import { useMemo } from "react";


export const usePositionList = () => {
  const isCreateDialogOpen = useSelector(
    selectors.getIsPositionCreateDialogOpen
  );
  const dayOfWeek = useMemo(
    () => [
      "Lunedì",
      "Martedì",
      "Mercoledì",
      "Giovedì",
      "Venerdì",
      "Sabato",
      "Domenica",
    ],
    []
  );
  return { isCreateDialogOpen, dayOfWeek };
};
