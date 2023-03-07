import { useCallback, useMemo } from "react";

import { Theme, useTheme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import { useSelector, useDispatch } from "react-redux";
import { selectors, actions } from "redux-store";
import { useIsAdmin } from "hooks/useIsAdmin";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialogRoot: {
      overflow: "visible!important",
    },
    dialogPaper: {
      overflow: "visible!important",
    },
  })
);

export const useFacilityTypeList = () => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const classes = useMemo(
    () => ({
      dialogClasses: {
        root: styles.dialogRoot,
        paper: styles.dialogPaper,
      },
    }),
    [styles]
  );

  const dispatch = useDispatch();

  const isAdmin = useIsAdmin();

  const isFacilityTypeCreateDialogOpen = useSelector(
    selectors.getIsFacilityTypeCreateDialogOpen
  );

  const closeFacilityTypeCreateDialog = useCallback(() => {
    dispatch(actions.setIsFacilityTypeCreateDialogOpen(false));
  }, [dispatch]);

  return {
    classes,
    isAdmin,
    isFacilityTypeCreateDialogOpen,
    closeFacilityTypeCreateDialog,
  };
};

export const useFacilityTypeListActions = () => {
  const dispatch = useDispatch();
  const isAdmin = useIsAdmin();

  const onFacilityTypeCreateButtonPressed = useCallback(() => {
    dispatch(actions.setIsFacilityTypeCreateDialogOpen(true));
  }, [dispatch]);

  return { isAdmin, onFacilityTypeCreateButtonPressed };
};
