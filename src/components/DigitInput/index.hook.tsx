import { useMemo } from "react";
import { Theme, useTheme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    digitInput: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      maxWidth: "100%",
      width: 60,
      height: 60,
      textAlign: "center",
      border: "2px solid #ccc",
      borderRadius: 3,
      transition: " border-color 0.3s",
      "&>*": {
        fontSize: 30,
        fontWeight: "bold",
        color: "#241D2D",
      },
    },
    active: {
      borderColor: "#241D2D",
    },
    disabled: {
      backgroundColor: "#ededed",
      "&>*": { color: "#515151" },
    },
  })
);

export const useDigitInput = () => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const classes = useMemo(() => ({}), []);

  return { styles, classes };
};
