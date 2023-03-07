import { Theme } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/styles";
import { useSelector } from "react-redux";
import { selectors } from "redux-store";

const useStyles = makeStyles((theme: Theme) => ({
  mainContainer: {
    width: "100%",
  },
}));

export const useEmployeePerCategory = () => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const data = useSelector(selectors.getMedsPerCategory);

  return { data, styles };
};
