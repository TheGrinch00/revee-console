import React, { useCallback } from "react";

import { actions } from "../../../redux-store";

import CloseIcon from "@material-ui/icons/Close";

import { useDispatch } from "react-redux";
import { Button, SaveButton, Toolbar } from "ra-ui-materialui";

import { makeStyles } from "@material-ui/styles";

const EmployeeCreateToolbar = (props: any) => {
  const dispatch = useDispatch();
  const onClickHandle = useCallback(() => {
    dispatch(actions.setIsEmployeeCreateDialogOpen(false));
  }, [dispatch]);
  return (
    <Toolbar {...props}>
      <SaveButton label="Save" submitOnEnter={true} />
      <Button label="Chiudi" onClick={onClickHandle}>
        <CloseIcon />
      </Button>
    </Toolbar>
  );
};

const useStyles = makeStyles(() => ({
  mainContainer: { width: "100%" },
}));

export const useEmployeeCreate = () => {
  const dispatch = useDispatch();
  const onSuccesshHandle = useCallback(() => {
    dispatch(actions.setIsEmployeeCreateDialogOpen(false));
  }, [dispatch]);
  const myStyle = useStyles();
  return { onSuccesshHandle, EmployeeCreateToolbar, myStyle };
};
