import { Theme, useTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  true: {
    color: "white",
    backgroundColor: theme.palette.primary.main,
    borderRadius: 7,
    padding: "2px 10px",
  },
  false: {
    color: "white",
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 7,
    padding: "2px 10px",
  },
}));

export const useCoolBooleanField = () => {
  const theme = useTheme();
  const styles = useStyles(theme);

  return { styles };
};
