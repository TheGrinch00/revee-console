import { memo } from "react";
import cn from "classnames";
import { useQontoStepIcon } from "./index.hook";

export interface IQontoStepIconProps {
  active?: boolean;
  completed?: boolean;
  icon: any;
  doneIcon: any;
}

const QontoStepIcon = ({
  active,
  completed,
  icon,
  doneIcon,
}: IQontoStepIconProps) => {
  const { styles } = useQontoStepIcon();

  return (
    <div
      className={cn(
        styles.root,
        active && styles.active,
        completed && styles.completed
      )}
    >
      {completed ? doneIcon : icon}
    </div>
  );
};

export default memo(QontoStepIcon);
