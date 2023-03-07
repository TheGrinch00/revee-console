import { useZoneTab } from "./index.hook";
import { RegionCard } from "components";
import { Grid } from "@material-ui/core";
import { memo } from "react";

const ZoneTab = () => {
  const { groupedProvinces, styles } = useZoneTab();

  return (
    <Grid container spacing={5} className={styles.container}>
      {groupedProvinces.map((element, index) => (
        <RegionCard key={index} data={element} />
      ))}
    </Grid>
  );
};

export default memo(ZoneTab);
