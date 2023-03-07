import { useMemo } from "react";
import { Theme, useTheme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dividerRoot: {
      backgroundColor: theme.palette.primary.main,
      opacity: 0.3,
    },
  })
);

export const useReveeDivider = () => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const classes = useMemo(
    () => ({
      divider: {
        root: styles.dividerRoot,
      },
    }),
    [styles]
  );

  return { styles, classes };
};
