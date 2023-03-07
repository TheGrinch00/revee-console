import { useMemo } from "react";
import { Theme, useTheme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fullWidth: { width: "100%" },
    inputBgWhite: {
      "&>*:not(:last-child):not(:first-child)": {
        backgroundColor: "white!important",
      },
    },
  })
);


export const useVisitCreateGeneralDataInput = () => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const classes = useMemo(() => ({}), []);

  return { styles, classes };
};
