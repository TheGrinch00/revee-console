import {
  Datagrid,
  EditButton,
  List,
  ListProps,
  ReferenceField,
  ReferenceFieldController,
  TextField,
} from "react-admin";
import { Dialog } from "@material-ui/core";
import { useVisitList } from "./index.hook";
import { VisitCreate } from "../visit-create/index";
import { CoolDateField, FullNameField } from "components";
export const VisitList = (props: ListProps) => {
  const { VisitListActions, isCreateDialogOpen } = useVisitList();
  return (
    <>
      <List {...props} actions={<VisitListActions />}>
        <Datagrid>
          <ReferenceField
            label="Medico"
            source="EmployeeId"
            reference="Employees"
          >
            <FullNameField
              label="Dottore"
              nameField="EmployeeName"
              surnameField="EmployeeSurname"
            />
          </ReferenceField>
          <ReferenceField label="Agente" source="MemberId" reference="Members">
            <FullNameField
              nameField="MemberName"
              surnameField="MemberSurname"
              label="Agente"
            />
          </ReferenceField>
          <ReferenceFieldController
            basePath="/positions"
            resource="Position"
            reference="Positions"
            source="PositionId"
          >
            {({ referenceRecord, ...props }) => (
              <ReferenceField
                basePath="/employments"
                resource="Positions"
                reference="Employments"
                source="EmploymentId"
                record={referenceRecord || { id: 1 }}
                linkType="show"
              >
                <TextField source="Employment" />
              </ReferenceField>
            )}
          </ReferenceFieldController>

          <CoolDateField label="Visita Prenotata" source="ScheduledDate" />
          <CoolDateField label="Visita Effettiva" source="RealDate" />
          <EditButton label="Modifica" />
        </Datagrid>
      </List>

      <Dialog open={isCreateDialogOpen} fullWidth maxWidth="lg">
        <VisitCreate {...props} />
      </Dialog>
    </>
  );
};
