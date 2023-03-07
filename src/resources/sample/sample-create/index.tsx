import { actions } from "../../../redux-store";
import { useSampleCreate } from "./index.hook";
import { useDispatch } from "react-redux";

import {
  Create,
  SimpleForm,
  TextInput,
  Toolbar,
  SaveButton,
  Button,
  BooleanInput,
  SelectInput
} from "react-admin";

import { useCallback } from "react";
import CloseIcon from "@material-ui/icons/Close";
import { Grid } from "@material-ui/core";

const SampleCreateToolbar = (props: any) => {
  const dispatch = useDispatch();
  const onClickHandle = useCallback(() => {
    dispatch(actions.setIsSampleCreateDialogOpen(false));
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

export const SampleCreate = (props: any) => {
  const { onSuccesshHandle, style , choices} = useSampleCreate();

  return (
    <Create {...props} onSuccess={onSuccesshHandle}>
      <SimpleForm toolbar={<SampleCreateToolbar />}>
        <Grid
          container
          direction="row"
          spacing={5}
          className={style.mainContainer}
        >
          <Grid
            container
            item
            direction="column"
            xs={6}
            xl={6}
            md={6}
            sm={6}
            lg={6}
          >
            <TextInput
              color="secondary"
              label="Nome"
              source="name"
              variant="outlined"
            />
            <BooleanInput
              color="secondary"
              label="Disabilitato"
              source="disabled"
              variant="outlined"
            />
            <SelectInput 
              choices={choices}
              source="type"
              variant="outlined"
              color="secondary"
              label="Tipo"
            />
          </Grid>
        </Grid>
      </SimpleForm>
    </Create>
  );
};
