import { memo } from "react";
import { Card } from "@mui/material";
import { Divider, Grid, List, ListItem, Typography } from "@material-ui/core";
import { ProvinceRow } from "components";
import { useRegionCard } from "./index.hook";
import { ProvinceData } from "hooks/useGroupedProvinces";
interface IRegionCardProps {
  data: { region: string; provinces: ProvinceData[] };
  forEdit?: boolean;
}

const RegionCard = ({ data, forEdit }: IRegionCardProps) => {
  const { styles, filteredProvinces } = useRegionCard(data.provinces);

  return forEdit ? (
    <Grid item xs={6} sm={6} md={4} lg={4}>
      <Card className={styles.cardContainer} elevation={5}>
        <Typography color="secondary" className={styles.regionName}>
          {data.region}
        </Typography>

        <Divider variant="middle" />
        <List className={styles.provincesList}>
          {data.provinces.map((element, index) => {
            return (
              <ListItem key={index}>
                {forEdit ? (
                  <ProvinceRow provinceData={element} />
                ) : (
                  <Typography color="secondary">{element.province}</Typography>
                )}
              </ListItem>
            );
          })}
        </List>
      </Card>
    </Grid>
  ) : filteredProvinces.length > 0 ? (
    <Grid item xs={6} sm={6} md={4} lg={3}>
      <Card className={styles.cardContainer} elevation={5}>
        <Typography color="secondary" className={styles.regionName}>
          {data.region}
        </Typography>

        <Divider variant="middle" />
        <List className={styles.provincesList}>
          {filteredProvinces.map((element, index) => {
            return (
              <ListItem key={index}>
                <Typography color="secondary">{element.province}</Typography>
              </ListItem>
            );
          })}
        </List>
      </Card>
    </Grid>
  ) : null;
};

export default memo(RegionCard);
