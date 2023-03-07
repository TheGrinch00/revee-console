import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import theme from "theme";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actions } from "redux-store";
import { useGetAccessToken } from "hooks/useGetAccessToken";

const useStyles = makeStyles((theme: Theme) => ({
  mainContainer: {
    width: "100%",
    marginTop: "2%",
    marginLeft: "2%",
    marginRight: "10%",
    paddingTop: "20px",
  },
  divider: {
    color: "#241D2D",
    width: "100%",
  },
}));

export const useGeneralStatistic = () => {
  const styles = useStyles(theme);
  const { token } = useGetAccessToken();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchStatistics({ token, general: true, id: "me" }));
  }, [token, dispatch]);

  return { styles };
};
