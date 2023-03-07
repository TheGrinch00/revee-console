import { Box, Grid, Tab, Tabs } from "@material-ui/core";
import React from "react";
import {
  Edit,
  EditProps,
  TextInput,
  SimpleForm,
  SimpleFormProps,
} from "react-admin";
import { useMemberEdit } from "./index.hook";
import { ZoneEditTab } from "components";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
export const MemberEdit = (props: EditProps) => {
  const { styles, handleChange, tabIndex, MemberTitle } = useMemberEdit();

  return (
    <Edit title={<MemberTitle />} {...props}>
      <>
        <Tabs value={tabIndex} onChange={handleChange}>
          <Tab label="Anagrafica" />
          <Tab label="Province" />
        </Tabs>
        <TabPanel value={tabIndex} index={0}>
          <SimpleForm {...(props as SimpleFormProps)}>
            <Grid
              className={styles.mainContainer}
              container
              direction="row"
              spacing={3}
              justifyContent="space-around"
            >
              <Grid
                container
                direction="column"
                item
                xs={12}
                xl={6}
                md={6}
                sm={6}
                lg={6}
              >
                <TextInput
                  color="secondary"
                  label="Nome"
                  source="MemberName"
                  variant="outlined"
                />
                <TextInput
                  color="secondary"
                  label="Cognome"
                  source="MemberSurname"
                  variant="outlined"
                />
                <TextInput
                  color="secondary"
                  label="Telefono"
                  source="MemberPhoneNumber"
                  variant="outlined"
                />
              </Grid>
              <Grid
                container
                direction="column"
                item
                xs={12}
                xl={6}
                md={6}
                sm={6}
                lg={6}
              >
                <TextInput
                  color="secondary"
                  label="Email"
                  source="email"
                  variant="outlined"
                />
                <TextInput
                  color="secondary"
                  label="Password"
                  source="password"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </SimpleForm>
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <ZoneEditTab />
        </TabPanel>
      </>
    </Edit>
  );
};
