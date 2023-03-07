import { useMemo } from "react";
import { Theme, useTheme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.secondary.main,
      backgroundColor: "#d0d0d0",
      borderRadius: "50%",
      border: `1px solid ${theme.palette.secondary.main}`,
      width: 35,
      height: 35,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    active: {
      color: "white",
      backgroundColor: theme.palette.primary.main,
    },
    completed: {
      color: "white",
      backgroundColor: theme.palette.primary.main,
    },
  })
);

export const useQontoStepIcon = () => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const classes = useMemo(() => ({}), []);

  return { styles, classes };
};
