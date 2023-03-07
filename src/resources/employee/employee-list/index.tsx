import {
  List,
  Datagrid,
  EmailField,
  ListProps,
  ShowButton,
  EditButton,
  TextField,
} from "react-admin";
import { FullNameField, CoolDateField } from "components";
import { EmployeeCreate } from "./../employee-create";
import { Dialog } from "@material-ui/core";
import { useEmployeeList } from "./index.hook";

export const EmployeeList = (props: ListProps) => {
  const { EmployeeListActions, EmployeeFilters, isCreateDialogOpen, isAdmin } =
    useEmployeeList();

  return (
    <>
      <List
        {...props}
        actions={<EmployeeListActions />}
        filters={<EmployeeFilters />}
        bulkActionButtons={false}
        syncWithLocation
      >
        <Datagrid>
          <FullNameField
            label="Nome"
            nameField="EmployeeName"
            surnameField="EmployeeSurname"
          />
          <EmailField color="secondary" label="Email" source="EmployeeEmail" />
          <CoolDateField label="Prima visita" source="FirstVisit" />
          <CoolDateField label="Ultima visita" source="LastVisit" />
          <TextField
            color="secondary"
            label="Telefono"
            source="EmployeePhoneNumber"
          />
          <ShowButton label="Mostra" />
          {isAdmin && <EditButton label="Modifica" />}
        </Datagrid>
      </List>

      <Dialog open={isCreateDialogOpen} fullWidth maxWidth="lg">
        <EmployeeCreate {...props} />
      </Dialog>
    </>
  );
};
