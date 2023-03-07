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

export const useProductCategoryList = () => {
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

  const isProductCategoryCreateDialogOpen = useSelector(
    selectors.getIsProductCategoryCreateDialogOpen
  );

  const closeProductCategoryCreateDialog = useCallback(() => {
    dispatch(actions.setIsProductCategoryCreateDialogOpen(false));
  }, [dispatch]);

  return {
    classes,
    isAdmin,
    isProductCategoryCreateDialogOpen,
    closeProductCategoryCreateDialog,
  };
};

export const useProductCategoryListActions = () => {
  const dispatch = useDispatch();
  const isAdmin = useIsAdmin();

  const onProductCategoryCreateButtonPressed = useCallback(() => {
    dispatch(actions.setIsProductCategoryCreateDialogOpen(true));
  }, [dispatch]);

  return { isAdmin, onProductCategoryCreateButtonPressed };
};
