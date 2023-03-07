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

export const useWardsList = () => {
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

  const isWardCreateDialogOpen = useSelector(
    selectors.getIsWardCreateDialogOpen
  );

  const closeWardCreateDialog = useCallback(() => {
    dispatch(actions.setIsWardCreateDialogOpen(false));
  }, [dispatch]);

  return { classes, isAdmin, isWardCreateDialogOpen, closeWardCreateDialog };
};

export const useWardsListActions = () => {
  const dispatch = useDispatch();
  const isAdmin = useIsAdmin();

  const onWardCreateButtonPressed = useCallback(() => {
    dispatch(actions.setIsWardCreateDialogOpen(true));
  }, [dispatch]);

  return { isAdmin, onWardCreateButtonPressed };
};
