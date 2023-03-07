import {
  List,
  Datagrid,
  ListProps,
  TextField,
  TopToolbar,
  Button,
  ReferenceField,
  FunctionField,
  EditButton,
} from "react-admin";

import { useDispatch } from "react-redux";

import { useCallback } from "react";
import { Dialog } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { usePositionList } from "./index.hook";
import { PositionCreate } from "..";
import { actions } from "redux-store";
import { FullNameField } from "components";

const PositionListActions = () => {
  const dispatch = useDispatch();
  const onClick = useCallback(() => {
    dispatch(actions.setIsPositionCreateDialogOpen(true));
  }, [dispatch]);

  return (
    <TopToolbar>
      <Button label="Crea" onClick={onClick}>
        <AddIcon />
      </Button>
    </TopToolbar>
  );
};

export const PositionList = (props: ListProps) => {
  const { isCreateDialogOpen, dayOfWeek } = usePositionList();
  return (
    <>
      <List
        actions={<PositionListActions />}
        bulkActionButtons={false}
        {...props}
      >
        <Datagrid style={{ tableLayout: "fixed" }}>
          <ReferenceField
            label="DOTTORE"
            source="EmployeeId"
            reference="Employees"
          >
            <FullNameField
              nameField="EmployeeName"
              surnameField="EmployeeSurname"
            />
          </ReferenceField>
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
            render={(record: any) => {
              const startHour: number = record.MeetingStartHour;
              const startMinute: number = record.MeetingStartMinute;

              if (!startHour || !startMinute) {
                return "Info non disponibili";
              } else {
                const paddedHour = startHour.toString().padStart(2, "0");
                const paddedMinute = startMinute.toString().padStart(2, "0");

                return `${paddedHour}:${paddedMinute}`;
              }
            }}
          />
          <FunctionField
            label="ORA FINE"
            render={(record: any) => {
              const endHour: string = record.MeetingEndHour;
              const endMinute: string = record.MeetingEndMinute;

              if (!endHour || !endMinute) {
                return "Info non disponibili";
              } else {
                const paddedHour = endHour.toString().padStart(2, "0");
                const paddedMinute = endMinute.toString().padStart(2, "0");

                return `${paddedHour}:${paddedMinute}`;
              }
            }}
          />
          <EditButton label="Modifica" />
        </Datagrid>
      </List>

      <Dialog open={isCreateDialogOpen} fullWidth maxWidth="lg">
        <PositionCreate {...props} />
      </Dialog>
    </>
  );
};
