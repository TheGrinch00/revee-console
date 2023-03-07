import { Theme, useTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useRecordContext } from "ra-core";

const useStyles = makeStyles((theme: Theme) => ({
  image: {
    width: 200,
    height: 200,
    borderRadius: "50%",
    border: `1px solid ${theme.palette.secondary.main}`,
    marginBottom: 20,
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    overflow: "hidden",
    objectFit: "cover",
  },
}));

export const useCustomImageField = () => {
  const record = useRecordContext();
  const theme = useTheme();
  const styles = useStyles(theme);

  return { styles, record };
};
