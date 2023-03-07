import { useGroupedProvinces } from "hooks/useGroupedProvinces";
import { useGetAllowedDivisions } from "hooks/useGetAllowedDivisions";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "redux-store";
import { useRecordContext } from "ra-core";
import { Theme } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/styles";
import { useGetAccessToken } from "hooks/useGetAccessToken";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: "1em 0",
    height: "100%",
    boxSizing: "border-box",
  },
  footer: {
    background: "#F5F5F5",
    padding: "12px 24px",
  },
}));
export const useEditZoneTab = () => {
  const theme = useTheme();
  const styles = useStyles(theme);
  useGetAllowedDivisions();
  const groupedProvinces = useGroupedProvinces();
  const dispatch = useDispatch();
  const provinces = useSelector(selectors.getSelectedProvinces);
  const record = useRecordContext();

  const { token } = useGetAccessToken();

  const onClickHandle = useCallback(() => {
    dispatch(
      actions.fetchSelectedProvince({
        provinces: provinces,
        memberId: record.id as number,
        token,
      })
    );
  }, [token, dispatch, provinces, record.id]);

  return { groupedProvinces, onClickHandle, styles };
};
