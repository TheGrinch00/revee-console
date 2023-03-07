import { useGroupedProvinces } from "hooks/useGroupedProvinces";
import { useGetAllowedDivisions } from "hooks/useGetAllowedDivisions";
import { Theme } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/styles";

export interface IProvinciaInfo {
  shortName?: string;
  province?: string;
  region?: string;
  selected?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: "3em 0",
    height: "100%",
    boxSizing: "border-box",
  },
}));
export const useZoneTab = () => {
  const theme = useTheme();
  const styles = useStyles(theme);
  useGetAllowedDivisions();
  const groupedProvinces = useGroupedProvinces();

  return { groupedProvinces, styles };
};
