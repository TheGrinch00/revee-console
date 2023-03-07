import { useCallback } from "react";

import { actions } from "redux-store";

import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/styles";

const choices = [
  {id: "bool", name: "Sì / No"},
  {id: "number", name: "Numerico"}
]

const useStyles = makeStyles(() => ({
  mainContainer: { width: "100%" },
}));



export const useSampleCreate = () => {
  const dispatch = useDispatch();

  // Transform data to be used in the select

  const onSuccesshHandle = useCallback(() => {
    dispatch(actions.setIsSampleCreateDialogOpen(false));
  }, [dispatch]);

  const style = useStyles();

  return {
    onSuccesshHandle,
    style,
    choices
  };
};
