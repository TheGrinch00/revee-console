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

import { useEmploymentsList, useEmploymentsListActions } from "./index.hook";

import { EmploymentEdit } from "../employments-edit";
import { EmploymentCreate } from "..";

export const EmploymentsList = (props: ListProps) => {
  const {
    classes,
    isAdmin,
    isEmploymentCreateDialogOpen,
    closeEmploymentCreateDialog,
  } = useEmploymentsList();

  return (
    <>
      <List
        {...props}
        bulkActionButtons={false}
        actions={<EmploymentListActions />}
      >
        <Datagrid expand={isAdmin ? <EmploymentEdit /> : undefined}>
          <TextField
            label="Nome impiego"
            color="secondary"
            source="Employment"
          />
        </Datagrid>
      </List>

      <Dialog
        classes={classes.dialogClasses}
        open={isEmploymentCreateDialogOpen}
        onBackdropClick={closeEmploymentCreateDialog}
        maxWidth="lg"
      >
        <EmploymentCreate {...props} />
      </Dialog>
    </>
  );
};

const EmploymentListActions = () => {
  const { isAdmin, onEmploymentCreateButtonPressed } =
    useEmploymentsListActions();

  return isAdmin ? (
    <TopToolbar>
      <Button label="Crea" onClick={onEmploymentCreateButtonPressed}>
        <AddIcon />
      </Button>
    </TopToolbar>
  ) : (
    <div />
  );
};
