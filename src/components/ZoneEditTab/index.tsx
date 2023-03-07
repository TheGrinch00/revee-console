import { useEditZoneTab } from "./index.hook";
import { RegionCard } from "components";
import { Grid } from "@material-ui/core";
import { Button } from "ra-ui-materialui";
import SaveIcon from "@mui/icons-material/Save";
import { memo } from "react";

const EditZoneTab = () => {
  const { groupedProvinces, onClickHandle, styles } = useEditZoneTab();

  return (
    <Grid>
      <Grid container spacing={5} className={styles.container}>
        {groupedProvinces.map((element, index) => (
          <RegionCard key={index} data={element} forEdit />
        ))}
      </Grid>
      <div className={styles.footer}>
        <Button
          variant="contained"
          onClick={onClickHandle}
          label="Aggiorna Permessi"
          startIcon={<SaveIcon />}
        />
      </div>
    </Grid>
  );
};

export default memo(EditZoneTab);
