import { useCallback } from "react";
import { useNotify } from "react-admin";

import { Theme, useTheme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import { useDispatch } from "react-redux";
import { actions } from "redux-store";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    positionRelative: {
      position: "relative",
      overflow: "visible",
      paddingTop: "1em",
    },
    iconAbsolute: {
      position: "absolute",
      border: "1px solid white",
      width: 50,
      height: 50,
      borderRadius: "50%",
      backgroundColor: theme.palette.primary.main,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      top: "0",
      left: "50%",
      transform: "translate(-50%, -50%)",

      "&>*": {
        color: "white",
      },
    },
  })
);

export const useEmploymentCreate = () => {
  const theme = useTheme();
  const styles = useStyles(theme);

  const notify = useNotify();
  const dispatch = useDispatch();

  const onSuccessHandler = useCallback(() => {
    notify("Nuovo impiego creato con successo", "success");
    dispatch(actions.setIsEmploymentCreateDialogOpen(false));
  }, [notify, dispatch]);

  const onFailureHandler = useCallback(() => {
    notify("Non è stato possibile creare l'impiego", "error");
  }, [notify]);

  return { styles, onSuccessHandler, onFailureHandler };
};
