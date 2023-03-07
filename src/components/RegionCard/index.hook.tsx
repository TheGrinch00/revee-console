import { Theme } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/styles";
import { ProvinceData } from "hooks/useGroupedProvinces";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectors } from "redux-store";

const useStyles = makeStyles((theme: Theme) => ({
  cardContainer: {
    paddingBottom: "4.6em",
    height: 370,
    boxSizing: "border-box",
  },
  regionName: {
    padding: "20px",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontVariant: "small-caps",
    fontSize: "1.4rem",
  },
  switch: {
    color: theme.palette.primary.main,
  },
  provincesList: {
    height: "100%",
    overflowY: "auto",
    boxSizing: "border-box",
    marginBottom: 0,
    scrollbarGutter: "stable both-edges",
  },
}));

export const useRegionCard = (provinces: ProvinceData[]) => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const allowedDivisions = useSelector(selectors.getSelectedProvinces);

  const filteredProvinces = useMemo(
    () => provinces.filter((p) => allowedDivisions.includes(p.shortName)),
    [allowedDivisions, provinces]
  );

  return { styles, filteredProvinces };
};
