import { Theme } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/styles";
import { useMemo } from "react";

const useStyles = makeStyles((theme: Theme) => ({
  mainContainer: {
    padding: "1.5em",
  },
  imageCard: {
    border: "1px solid",
    borderColor: theme.palette.primary.main,
    borderRadius: 25,
    height: "100%",
    padding: "3em 0",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
  },
  anagraficCard: {
    border: "1px solid",
    borderColor: theme.palette.primary.main,
    borderRadius: 25,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    boxSizing: "border-box",
  },
  textField: {
    marginLeft: "2em",
  },
  label: {
    color: "#a9a9a9",
    fontSize: 11,
  },
  bold: {
    "&>*": {
      fontWeight: "900!important",
    },
  },
  commentStyle: {
    textAlign: "center",
    padding: "0.5em 5em",
    fontSize: 11,
  },
  selectedTab: {
    color: theme.palette.primary.main,
  },
}));

export const useEmployeeShow = () => {
  const theme: Theme = useTheme();
  const styles = useStyles(theme);
  const dayOfWeek = useMemo(
    () => [
      "Lunedì",
      "Martedì",
      "Mercoledì",
      "Giovedì",
      "Venerdì",
      "Sabato",
      "Domenica",
    ],
    []
  );
  const classes = useMemo(
    () => ({
      tab: {
        selected: styles.selectedTab,
      },
    }),
    [styles]
  );
  return { styles, classes, dayOfWeek };
};
