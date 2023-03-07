import { FC, memo } from "react";
import { useDigitInput } from "./index.hook";
import { Typography } from "@material-ui/core";

import cn from "classnames";

interface DigitInputProps {
  value: string;
  isSelected: boolean;
  disabled?: boolean;
}

const DigitInput: FC<DigitInputProps> = ({
  value,
  isSelected,
  disabled = false,
}) => {
  const { styles } = useDigitInput();

  return (
    <div
      className={cn(
        styles.digitInput,
        isSelected ? styles.active : undefined,
        disabled ? styles.disabled : undefined
      )}
    >
      <Typography variant="h6">{value}</Typography>
    </div>
  );
};

export default memo(DigitInput);
