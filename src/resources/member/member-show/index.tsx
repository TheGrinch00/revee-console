import { Card, Grid } from "@material-ui/core";
import { useMemberShow } from "./index.hook";
import {
  Show,
  TabbedShowLayout,
  TabbedShowLayoutTabs,
  Tab,
  TextField,
  ShowProps,
  ReferenceManyField,
  Datagrid,
  ShowButton,
  ReferenceField,
} from "react-admin";
import {
  CustomImageField,
  FullNameField,
  CoolDateFieldShow,
  ZoneTab,
} from "components";

export const MemberShow = (props: ShowProps) => {
  const { styles, MemberTitle, Expire, SamplesGraph, LineChartTabbed } =
    useMemberShow(props);

  return (
    <Show title={<MemberTitle />} {...props}>
      <TabbedShowLayout tabs={<TabbedShowLayoutTabs variant="fullWidth" />}>
        <Tab label="Summary">
          <Grid
            container
            direction="row"
            spacing={6}
            className={styles.mainContainer}
          >
            <Grid item xs={3}>
              <Card className={styles.imageCard}>
                <Grid container>
                  <Grid item xs={12} container justifyContent="center">
                    <CustomImageField source="MemberProfilePictureURL" />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    container
                    justifyContent="center"
                    direction="column"
                  >
                    <FullNameField
                      nameField="MemberName"
                      surnameField="MemberSurname"
                    />
                    <TextField color="secondary" source="email" />
                    <TextField color="secondary" source="MemberPhoneNumber" />
                  </Grid>
                </Grid>
              </Card>
            </Grid>

            <Grid item xs={9}>
              <Card className={styles.anagraficCard}>
                <Grid
                  container
                  direction="column"
                  justifyContent="space-evenly"
                  spacing={3}
                ></Grid>
              </Card>
            </Grid>
          </Grid>
        </Tab>
        <Tab label="In scadenza">
          <Expire />
        </Tab>
        <Tab label="ZONE">
          <ZoneTab />
        </Tab>
        <Tab label="Visite effettuate">
          <ReferenceManyField
            label="Visite"
            reference="Visits"
            target="MemberId"
          >
            <Datagrid style={{ tableLayout: "fixed" }}>
              <ReferenceField
                label="CLIENTE"
                source="EmployeeId"
                reference="Employees"
              >
                <FullNameField
                  nameField="EmployeeName"
                  surnameField="EmployeeSurname"
                />
              </ReferenceField>

              <CoolDateFieldShow label="DATA " source="ScheduledDate" />
              <ReferenceField
                label="POSIZIONE"
                source="PositionId"
                reference="Positions"
              >
                <ReferenceField source="EmploymentId" reference="Employments">
                  <TextField color="secondary" source="Employment" />
                </ReferenceField>
              </ReferenceField>
              <ReferenceField
                label="STRUTTURA"
                source="PositionId"
                reference="Positions"
              >
                <ReferenceField source="FacilityId" reference="Facilities">
                  <TextField color="secondary" source="FacilityName" />
                </ReferenceField>
              </ReferenceField>

              <ShowButton label="mostra" />
            </Datagrid>
          </ReferenceManyField>
        </Tab>
        <Tab label="Statistiche">
          <div>
            <SamplesGraph />
            <LineChartTabbed type="newMeds" />
            <LineChartTabbed type="visitedEmployees" />
          </div>
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};
