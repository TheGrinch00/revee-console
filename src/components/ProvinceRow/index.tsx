import { memo } from "react";
import { Grid, Typography, Switch } from "@material-ui/core";

import { useProvinceRow } from "./index.hook";
interface IProvinceRowProps {
  provinceData: { province: string; region: string; shortName: string };
}

const ProvinceRow = ({ provinceData }: IProvinceRowProps) => {
  const { isActive, onSwitched } = useProvinceRow(provinceData.shortName);

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Typography>{provinceData.province}</Typography>
      <Switch checked={isActive} color="primary" onChange={onSwitched} />
    </Grid>
  );
};

export default memo(ProvinceRow);
