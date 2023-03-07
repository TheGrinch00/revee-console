import {
  Datagrid,
  List,
  ListProps,
  TextField,
  TopToolbar,
  Button,
} from "react-admin";
import { Dialog } from "@mui/material";
import AddIcon from "@material-ui/icons/Add";

import { useFacilityTypeList, useFacilityTypeListActions } from "./index.hook";

import { FacilityTypeEdit } from "..";
import { FacilityTypeCreate } from "..";

export const FacilityTypeList = (props: ListProps) => {
  const {
    classes,
    isAdmin,
    isFacilityTypeCreateDialogOpen,
    closeFacilityTypeCreateDialog,
  } = useFacilityTypeList();

  return (
    <>
      <List
        {...props}
        bulkActionButtons={false}
        actions={<FacilityTypeListActions />}
      >
        <Datagrid expand={isAdmin ? <FacilityTypeEdit /> : undefined}>
          <TextField color="secondary" label="Nome tipologia" source="Type" />
        </Datagrid>
      </List>

      <Dialog
        classes={classes.dialogClasses}
        open={isFacilityTypeCreateDialogOpen}
        onBackdropClick={closeFacilityTypeCreateDialog}
        maxWidth="lg"
      >
        <FacilityTypeCreate {...props} />
      </Dialog>
    </>
  );
};

const FacilityTypeListActions = () => {
  const { isAdmin, onFacilityTypeCreateButtonPressed } =
    useFacilityTypeListActions();

  return isAdmin ? (
    <TopToolbar>
      <Button label="Crea" onClick={onFacilityTypeCreateButtonPressed}>
        <AddIcon />
      </Button>
    </TopToolbar>
  ) : (
    <div />
  );
};
