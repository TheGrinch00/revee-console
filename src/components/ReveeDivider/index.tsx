import { Divider } from "@material-ui/core";
import { memo } from "react";
import { useReveeDivider } from "./index.hook";

const ReveeDivider = () => {
  const { classes } = useReveeDivider();

  return <Divider classes={classes.divider} />;
};

export default memo(ReveeDivider);