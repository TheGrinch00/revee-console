import { Card, Grid, Typography } from "@material-ui/core";
import { useEmployeeShow } from "./index.hook";
import {
  Show,
  TabbedShowLayout,
  TabbedShowLayoutTabs,
  TextField,
  ShowProps,
  Tab,
  useRecordContext,
  ReferenceField,
  ShowButton,
  Datagrid,
  ReferenceManyField,
  FunctionField,
} from "react-admin";
import {
  CustomImageField,
  CoolDateFieldShow,
  ReveeDivider,
  FullNameField,
} from "components";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import WorkIcon from "@material-ui/icons/Work";
import AssignmentIcon from "@material-ui/icons/Assignment";

const EmployeeTitle = () => {
  const record = useRecordContext();
  return (
    <span>
      Medico{record ? `: ${record.EmployeeName} ${record.EmployeeSurname}` : ""}
    </span>
  );
};

export const EmployeeShow = (props: ShowProps) => {
  const { styles, classes, dayOfWeek } = useEmployeeShow();
  return (
    <Show title={<EmployeeTitle />} {...props}>
      <TabbedShowLayout tabs={<TabbedShowLayoutTabs variant="fullWidth" />}>
        <Tab label="Anagrafica" classes={classes.tab} icon={<AccountBoxIcon />}>
          <Grid
            container
            direction="row"
            spacing={6}
            className={styles.mainContainer}
          >
            <Grid item xs={4}>
              <Card className={styles.imageCard} elevation={5}>
                <Grid container alignItems="stretch">
                  <Grid item xs={12} container justifyContent="center">
                    <CustomImageField source="EmployeeProfilePictureURL" />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    container
                    justifyContent="center"
                    className={styles.bold}
                  >
                    <FullNameField
                      nameField="EmployeeName"
                      surnameField="EmployeeSurname"
                    />
                  </Grid>
                  <Grid item xs={12} container justifyContent="center">
                    <TextField
                      variant="h6"
                      align="center"
                      source="Comment"
                      className={styles.commentStyle}
                    />
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={8}>
              <Card className={styles.anagraficCard} elevation={5}>
                <Grid
                  container
                  direction="column"
                  justifyContent="space-evenly"
                  spacing={3}
                >
                  <Grid item />
                  <Grid item className={styles.textField}>
                    <Typography className={styles.label}>
                      Data di Nascita
                    </Typography>
                    <CoolDateFieldShow source="EmployeeBirthDate" />
                  </Grid>
                  <ReveeDivider />
                  <Grid item className={styles.textField}>
                    <Typography className={styles.label}>
                      Numero di telefono
                    </Typography>
                    <TextField source="EmployeePhoneNumber" />
                  </Grid>
                  <ReveeDivider />
                  <Grid item className={styles.textField}>
                    <Typography className={styles.label}>Email</Typography>
                    <TextField source="EmployeeEmail" />
                  </Grid>
                  <ReveeDivider />
                  <Grid item className={styles.textField}>
                    <Typography className={styles.label}>Categoria</Typography>
                    <ReferenceField
                      source="CategoryId"
                      reference="Categories"
                      linkType={false}
                    >
                      <TextField source="Category" />
                    </ReferenceField>
                  </Grid>
                  <Grid item />
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Tab>
        <Tab fullWidth label="Lavoro" icon={<WorkIcon />} classes={classes.tab}>
          <ReferenceManyField
            label="POSIZIONI"
            source="id"
            reference="Positions"
            target="EmployeeId"
          >
            <Datagrid style={{ tableLayout: "fixed" }}>
              <ReferenceField
                label="IMPIEGO"
                source="EmploymentId"
                reference="Employments"
              >
                <TextField color="secondary" source="Employment" />
              </ReferenceField>

              <ReferenceField
                label="STRUTTURA"
                source="FacilityId"
                reference="Facilities"
              >
                <TextField color="secondary" source="FacilityName" />
              </ReferenceField>
              <FunctionField
                label="GIORNO"
                render={(record: any) => dayOfWeek[record.MeetingDay]}
              />
              <FunctionField
                  label="ORA INIZIO"
                  render={(record: any) =>
                    {
                      const startHour: number = record.MeetingStartHour;
                      const startMinute: number = record.MeetingStartMinute;

                      if(!startHour || !startMinute) {
                        return "Info non disponibili";
                      } else {
                        const paddedHour = startHour.toString().padStart(2, "0");
                        const paddedMinute = startMinute.toString().padStart(2,"0");

                        return `${paddedHour}:${paddedMinute}`;
                      }
                    }
                  }
              />
              <FunctionField
                label="ORA FINE"
                render={(record: any) =>
                  {
                    const endHour: string = record.MeetingEndHour;
                    const endMinute: string = record.MeetingEndMinute;

                    if(!endHour || !endMinute) {
                      return "Info non disponibili"
                    } else {
                      const paddedHour = endHour.toString().padStart(2, "0");
                      const paddedMinute = endMinute.toString().padStart(2,"0");

                      return `${paddedHour}:${paddedMinute}`;
                    }
                  }
                }
              />
            </Datagrid>
          </ReferenceManyField>
        </Tab>
        <Tab
          fullWidth
          label="Visite"
          icon={<AssignmentIcon />}
          classes={classes.tab}
        >
          <ReferenceManyField
            label="Visite"
            source="VisitId"
            reference="Visits"
            target="id"
          >
            <Datagrid style={{ tableLayout: "fixed" }}>
              <ReferenceField
                label="AGENTE"
                source="MemberId"
                reference="Members"
              >
                <FullNameField
                  nameField="MemberName"
                  surnameField="MemberSurname"
                />
              </ReferenceField>
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
              <CoolDateFieldShow label="DATA " source="ScheduledDate" />

              <ShowButton label="mostra" />
            </Datagrid>
          </ReferenceManyField>
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};
