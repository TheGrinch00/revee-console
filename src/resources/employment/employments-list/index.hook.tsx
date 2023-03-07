import { useCallback, useMemo } from "react";

import { Theme, useTheme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import { useSelector, useDispatch } from "react-redux";
import { selectors, actions } from "../../../redux-store";
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

export const useEmploymentsList = () => {
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

  const isEmploymentCreateDialogOpen = useSelector(
    selectors.getIsEmploymentCreateDialogOpen
  );

  const closeEmploymentCreateDialog = useCallback(() => {
    dispatch(actions.setIsEmploymentCreateDialogOpen(false));
  }, [dispatch]);

  return {
    classes,
    isAdmin,
    isEmploymentCreateDialogOpen,
    closeEmploymentCreateDialog,
  };
};

export const useEmploymentsListActions = () => {
  const dispatch = useDispatch();
  const isAdmin = useIsAdmin();

  const onEmploymentCreateButtonPressed = useCallback(() => {
    dispatch(actions.setIsEmploymentCreateDialogOpen(true));
  }, [dispatch]);

  return { isAdmin, onEmploymentCreateButtonPressed };
};
