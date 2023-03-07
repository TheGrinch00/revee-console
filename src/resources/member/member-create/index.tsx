import React from "react";

import { Grid } from "@material-ui/core";
import { Create, DateInput, SimpleForm, TextInput } from "react-admin";
import { useMemberCreate } from "./index.hook";
import { Typography } from "@mui/material";

export const MemberCreate = (props: any) => {
  const {
    onSuccesshHandle,
    MemberCreateToolbar,
    styles,
    isManager,
    ManagerAutoCompleteInput,
    SwitchManager,
    setIsManager,
  } = useMemberCreate();

  return (
    <Create onSuccess={onSuccesshHandle} title="" {...props}>
      <SimpleForm toolbar={<MemberCreateToolbar />} variant="outlined">
        <Typography variant="h5" color="#E20074" className={styles.title}>
          Nuovo Agente
        </Typography>
        <Grid
          container
          direction="column"
          xs={11}
          xl={11}
          md={11}
          sm={11}
          lg={11}
          className={styles.mainContainer}
        >
          <Grid
            container
            direction="row"
            item
            xs={11}
            xl={11}
            md={11}
            sm={11}
            lg={11}
          >
            <Grid
              item
              xs={11}
              xl={5}
              md={5}
              sm={5}
              lg={5}
              className={styles.gridItem}
            >
              <TextInput
                color="secondary"
                variant="outlined"
                source="MemberName"
                label="Nome"
                initialValue=" "
                fullWidth
              />
            </Grid>
            <Grid
              item
              xs={11}
              xl={5}
              md={5}
              sm={5}
              lg={5}
              className={styles.gridItem}
            >
              <TextInput
                color="secondary"
                variant="outlined"
                source="MemberSurname"
                label="Cognome"
                initialValue=" "
                fullWidth
              />
            </Grid>
            <DateInput
              variant="outlined"
              source="MemberBirthdate"
              label="Data di nascita"
              tic
            />
          </Grid>

          <Grid
            container
            direction="column"
            item
            xs={11}
            xl={5}
            md={5}
            sm={5}
            lg={5}
          >
            <TextInput
              variant="outlined"
              source="email"
              label="Email"
              initialValue=" "
            />
            <TextInput
              color="secondary"
              variant="outlined"
              source="MemberPhoneNumber"
              label="Numero di telefono"
              initialValue="+39"
            />
            <TextInput
              color="secondary"
              variant="outlined"
              source="username"
              label="Username"
              initialValue=" "
            />
            <TextInput
              color="secondary"
              variant="outlined"
              source="MemberProfilePictureURL"
              label="Immagine di Profilo*"
              initialValue=" "
            />

            <Grid container direction="column" alignItems="stretch">
              <SwitchManager
                isManager={isManager}
                setIsManager={setIsManager}
              ></SwitchManager>
              {isManager ? (
                <Typography>È un manager</Typography>
              ) : (
                <ManagerAutoCompleteInput />
              )}
            </Grid>
          </Grid>
        </Grid>
      </SimpleForm>
    </Create>
  );
};
