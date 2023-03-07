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

import { useWardsList, useWardsListActions } from "./index.hook";

import { WardEdit } from "..";
import { WardCreate } from "..";

export const WardsList = (props: ListProps) => {
  const { classes, isAdmin, isWardCreateDialogOpen, closeWardCreateDialog } =
    useWardsList();

  return (
    <>
      <List {...props} bulkActionButtons={false} actions={<WardListActions />}>
        <Datagrid expand={isAdmin ? <WardEdit /> : undefined}>
          <TextField color="secondary" label="Reparto" source="Ward" />
        </Datagrid>
      </List>

      <Dialog
        classes={classes.dialogClasses}
        open={isWardCreateDialogOpen}
        onBackdropClick={closeWardCreateDialog}
        maxWidth="lg"
      >
        <WardCreate {...props} />
      </Dialog>
    </>
  );
};

const WardListActions = () => {
  const { isAdmin, onWardCreateButtonPressed } = useWardsListActions();

  return isAdmin ? (
    <TopToolbar>
      <Button label="Crea" onClick={onWardCreateButtonPressed}>
        <AddIcon />
      </Button>
    </TopToolbar>
  ) : (
    <div />
  );
};
