import { actions } from "../../../redux-store";
import { useFacilityCreate } from "./index.hook";
import { useDispatch } from "react-redux";

import {
  Create,
  SimpleForm,
  TextInput,
  Toolbar,
  SaveButton,
  Button,
  SelectInput,
  ReferenceInput,
  FormDataConsumer,
} from "react-admin";

import { useCallback } from "react";
import CloseIcon from "@material-ui/icons/Close";
import { Grid } from "@material-ui/core";

const FacilityCreateToolbar = (props: any) => {
  const dispatch = useDispatch();
  const onClickHandle = useCallback(() => {
    dispatch(actions.setIsFacilityCreateDialogOpen(false));
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

export const FacilityCreate = (props: any) => {
  const {
    onSuccesshHandle,
    regionsOptions,
    getProvincesOptions,
    facilityCreateValidator,
    style
  } = useFacilityCreate();

  return (
    <Create {...props} onSuccess={onSuccesshHandle}>
      <SimpleForm
        toolbar={<FacilityCreateToolbar />}
        validate={facilityCreateValidator}
      >
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
              fullWidth
              color="secondary"
              label="Nome"
              source="FacilityName"
              variant="outlined"
            />
            <TextInput
              color="secondary"
              label="Via"
              source="Street"
              variant="outlined"
            />
            <TextInput
              color="secondary"
              label="Numero Civico"
              source="HouseNumber"
              variant="outlined"
            />
            <TextInput
              color="secondary"
              label="Codice Postale"
              source="PostalCode"
              variant="outlined"
            />
            <ReferenceInput
              color="secondary"
              variant="outlined"
              label="Tipologia"
              source="TypeId"
              reference="FacilityTypes"
            >
              <SelectInput color="secondary" optionText="Type" />
            </ReferenceInput>
          </Grid>
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
            <SelectInput
              color="secondary"
              label="Regione"
              name="region"
              optionText="value"
              source=""
              choices={regionsOptions}
              variant="outlined"
            />
            <FormDataConsumer>
              {({ formData, ...rest }) =>
                formData.region ? (
                  <SelectInput
                    color="secondary"
                    label="Provincia"
                    name="Division"
                    source="Division"
                    optionText="value"
                    choices={getProvincesOptions(formData.region)}
                    variant="outlined"
                    {...rest}
                  />
                ) : null
              }
            </FormDataConsumer>
            <TextInput
              color="secondary"
              label="Website"
              source="Website"
              variant="outlined"
            />
            <TextInput
              color="secondary"
              label="Telefono"
              source="PhoneNumber"
              variant="outlined"
            />
            <TextInput
              color="secondary"
              label="Email"
              source="Email"
              variant="outlined"
            />
          </Grid>
        </Grid>
      </SimpleForm>
    </Create>
  );
};
