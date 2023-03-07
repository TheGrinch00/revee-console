import React, { useCallback, useEffect, useState } from "react";

import { actions } from "../../../redux-store";
import { makeStyles } from "@material-ui/styles";
import CloseIcon from "@material-ui/icons/Close";
import { AutocompleteInput } from "react-admin";
import { useDispatch } from "react-redux";
import { Button, SaveButton, Toolbar } from "ra-ui-materialui";
import { Grid, Switch, Typography } from "@material-ui/core";
import { useGetList } from "react-admin";
import { useForm } from "react-final-form";
import { Theme, useTheme } from "@mui/material/styles";

const useStyles = makeStyles((theme: Theme) => ({
  mainContainer: {
    width: "100%",
    paddingLeft: "10%",
  },
  gridItem: {
    margin: "5px",
    boxSizing: "border-box",
  },
  toolbar: {
    paddingLeft: "80%",
    paddingRight: "0%",
  },
  title: {
    paddingLeft: "11%",
    paddingBottom: "2%",
  },
}));

const MemberCreateToolbar = (props: any) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const styles = useStyles(theme);

  const onClickHandle = useCallback(() => {
    dispatch(actions.setIsMemberCreateDialogOpen(false));
  }, [dispatch]);
  return (
    <Toolbar {...props} className={styles.toolbar}>
      <SaveButton label="Save" submitOnEnter={true} />
      <Button label="Chiudi" onClick={onClickHandle}>
        <CloseIcon />
      </Button>
    </Toolbar>
  );
};

const ManagerAutoCompleteInput = () => {
  const { data } = useGetList("Members");
  const choices = Object.values(data);
  useEffect(() => {
    choices.filter((value: any) => value.managerId === null);
  }, [choices]);
  const OptionRenderer = useCallback((choice: any) => {
    return (
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        style={{ width: "100%" }}
      >
        <Grid item sm={3}>
          <Typography>{choice.record.MemberName}</Typography>
        </Grid>
        <Grid item sm={5}>
          <Typography>{choice.record.MemberSurname}</Typography>
        </Grid>
      </Grid>
    );
  }, []);
  const inputText = useCallback(
    (choice: any) => `${choice.MemberName} ${choice.MemberSurname}`,
    []
  );

  return (
    <AutocompleteInput
      resettable
      variant="outlined"
      label="Nome manager"
      fullWidth
      source="managerId"
      choices={choices}
      optionText={<OptionRenderer />}
      inputText={inputText}
      initialValue=" "
      matchSuggestion={(filterValue: any, suggestion: any) => {
        const fullname = `${suggestion.ward} ${suggestion.facility}`;
        return filterValue
          ? fullname.toLowerCase().includes(filterValue.toLowerCase())
          : true;
      }}
    />
  );
};

interface ISwitchManagerInput {
  isManager: boolean;
  setIsManager: any;
}
const SwitchManager = ({ isManager, setIsManager }: ISwitchManagerInput) => {
  const form = useForm();

  const onClickHandle = useCallback(() => {
    setIsManager((old: boolean) => !old);
    form.change("managerId", undefined);
  }, [form, setIsManager]);

  return (
    <Switch
      color="primary"
      checked={isManager}
      onClick={onClickHandle}
    ></Switch>
  );
};

export const useMemberCreate = () => {
  const [isManager, setIsManager] = useState(true);
  const dispatch = useDispatch();
  const onSuccesshHandle = useCallback(() => {
    dispatch(actions.setIsMemberCreateDialogOpen(false));
  }, [dispatch]);

  const theme = useTheme();
  const styles = useStyles(theme);

  return {
    onSuccesshHandle,
    MemberCreateToolbar,
    styles,
    isManager,
    ManagerAutoCompleteInput,
    SwitchManager,
    setIsManager,
  };
};
