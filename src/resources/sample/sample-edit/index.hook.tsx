import { makeStyles } from "@material-ui/styles";

export const choices = [
  { id: "bool", name: "Sì / No" },
  { id: "number", name: "Numerico" },
];

const useStyles = makeStyles(() => ({
  mainContainer: { width: "100%" },
}));

export const useSampleEdit = () => {
  const style = useStyles();

  return {
    style,
    choices,
  };
};
