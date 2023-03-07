import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Theme, useTheme } from "@material-ui/core";
import { useMemo } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      borderRadius: 10,
      padding: "5px 15px",
      display: "inline-block",
    },
    active: {
      backgroundColor: theme.palette.primary.main,
    },
    disabled: {
      backgroundColor: theme.palette.secondary.main,
    },
    statusLabel: {
      color: "white",
      fontWeight: "bold",
      textTransform: "uppercase",
    },
  })
);

export const useIsActiveChipField = (
  recordValue: boolean,
  activeOnFalse: boolean
) => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const classes = useMemo(() => ({}), []);

  const isActive = useMemo(() => {
    return (recordValue && !activeOnFalse) || (!recordValue && activeOnFalse);
  }, [recordValue, activeOnFalse]);

  return { isActive, styles, classes };
};
