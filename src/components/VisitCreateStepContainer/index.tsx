import { memo, PropsWithChildren } from "react";
import { Typography } from "@material-ui/core";
import { Paper } from "@mui/material";
import { useVisitCreateStepContainer } from "./index.hook";

interface VisitCreateStepContainerProps {
  stepName: string;
  children: React.ReactNode;
}

const VisitCreateStepContainer: React.FC<
  PropsWithChildren<VisitCreateStepContainerProps>
> = ({ stepName, children }) => {
  const { styles, classes } = useVisitCreateStepContainer();

  return (
    <div className={styles.mainContainer}>
      <Typography color="secondary" variant="h2">
        {stepName}
      </Typography>
      <Paper classes={classes.productPaper}>{children}</Paper>
    </div>
  );
};

export default memo(VisitCreateStepContainer);
