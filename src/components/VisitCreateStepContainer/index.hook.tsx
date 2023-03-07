import { useMemo } from "react";
import { Theme, useTheme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      padding: "2em",
      "&>*:first-child": {
        marginBottom: "0.5em",
      },
    },
    paperRoot: {
      backgroundColor: "#F5F5F5!important",
      padding: "1em",
    },
  })
);

export const useVisitCreateStepContainer = () => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const classes = useMemo(
    () => ({
      productPaper: {
        root: styles.paperRoot,
      },
    }),
    [styles]
  );

  return { styles, classes };
};
