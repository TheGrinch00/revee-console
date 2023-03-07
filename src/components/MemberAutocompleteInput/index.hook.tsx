import { useCallback, useMemo } from "react";
import { Theme, useTheme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fullWidth: { width: "100%" },
    inputBgWhite: {
      "&>*:not(:last-child):not(:first-child)": {
        backgroundColor: "white!important",
      },
    },
  })
);

interface IUseMemberAutocompleteInput {
  name: string;
  surname: string;
}
export const useMemberAutocompleteInput = ({
  name,
  surname,
}: IUseMemberAutocompleteInput) => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const classes = useMemo(() => ({}), []);

  const inputText = useCallback(
    (choice: any) => `${choice[name]} ${choice[surname]}`,
    [name, surname]
  );

  const matchSuggestion = useCallback(
    (filterValue: any, suggestion: any) => {
      const fullname = `${suggestion[name]} ${suggestion[surname]}`;
      return filterValue
        ? fullname.toLowerCase().includes(filterValue.toLowerCase())
        : true;
    },
    [name, surname]
  );
  return { styles, classes, matchSuggestion, inputText };
};
