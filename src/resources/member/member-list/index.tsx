import {
  List,
  Datagrid,
  EmailField,
  ListProps,
  ShowButton,
  EditButton,
  TextField,
} from "react-admin";
import {
  FullNameField,
  IsActiveChipField,
  CoolDateFieldShow,
} from "components";
import { MemberCreate } from "../member-create";
import { Dialog } from "@material-ui/core";
import { useMemberList } from "./index.hook";

export const MemberList = (props: ListProps) => {
  const {
    MemberListActions,
    MemberFilters,
    isMemberCreateDialogOpen,
    MemberTitle,
    isAdmin,
  } = useMemberList();

  return (
    <>
      <List
        {...props}
        title={<MemberTitle />}
        actions={<MemberListActions />}
        filters={<MemberFilters />}
        bulkActionButtons={false}
      >
        <Datagrid>
          <FullNameField
            label="Nome"
            nameField="MemberName"
            surnameField="MemberSurname"
          />
          <CoolDateFieldShow source="MemberBirthdate" />
          <TextField
            color="secondary"
            label="Telefono"
            source="MemberPhoneNumber"
          />
          <EmailField color="secondary" label="Email" source="email" />
          <IsActiveChipField label="Stato" source="Disabled" activeOnFalse />
          {isAdmin && <EditButton label="Modifica" />}
          <ShowButton label="Mostra" variant="text" color="secondary" />
        </Datagrid>
      </List>

      <Dialog open={isMemberCreateDialogOpen} fullWidth maxWidth="lg">
        <MemberCreate {...props} />
      </Dialog>
    </>
  );
};
