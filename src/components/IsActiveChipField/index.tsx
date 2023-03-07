import { memo } from "react";
import { useIsActiveChipField } from "components/IsActiveChipField/index.hook";
import cn from "classnames";
import { Typography } from "@material-ui/core";

interface IsActiveChipFieldProps {
  record?: any;
  label?: string;
  source: string;
  activeOnFalse?: boolean;
}

const IsActiveChipField = ({
  record,
  source,
  activeOnFalse = false,
}: IsActiveChipFieldProps) => {
  const { isActive, styles } = useIsActiveChipField(
    record[source] as boolean,
    activeOnFalse
  );

  return (
    <div
      className={cn(
        styles.container,
        isActive ? styles.active : styles.disabled
      )}
    >
      <Typography variant="caption" className={styles.statusLabel}>
        {isActive ? "Attivo" : "Disabilitato"}
      </Typography>
    </div>
  );
};

export default memo(IsActiveChipField);
