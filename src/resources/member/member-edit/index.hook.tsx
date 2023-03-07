import { Theme } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/styles";
import { useRecordContext } from "ra-core";
import { ChangeEvent, useCallback, useState } from "react";

const useStyles = makeStyles((theme: Theme) => ({
  mainContainer: {
    width: "100%",
  },
}));
const MemberTitle = () => {
  const record = useRecordContext();
  return (
    <span>
      Agente{record ? `: ${record.MemberName} ${record.MemberSurname}` : ""}
    </span>
  );
};
export const useMemberEdit = () => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const [tabIndex, setTabIndex] = useState<0 | 1>(0);
  const handleChange = useCallback(
    (event: ChangeEvent<{}>, newValue: 0 | 1) => {
      setTabIndex(newValue);
    },
    []
  );
  return { styles, handleChange, tabIndex, MemberTitle };
};
