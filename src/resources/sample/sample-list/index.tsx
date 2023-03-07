import {
  List,
  Datagrid,
  ListProps,
  EditButton,
  TextField,
  Filter,
  TopToolbar,
  Button,
  FunctionField,
  SearchInput,
} from "react-admin";

import { useDispatch } from "react-redux";

import { useCallback } from "react";
import { Dialog } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { useSampleList } from "./index.hook";
import { SampleCreate } from "..";
import { actions } from "redux-store";
import { IsActiveChipField } from "components";
import { useIsAdmin } from "hooks/useIsAdmin";

const SampleFilters = () => (
  <Filter>
    <SearchInput variant="outlined" source="q" alwaysOn />
  </Filter>
);

const SampleListActions = () => {
  const dispatch = useDispatch();
  const onClick = useCallback(() => {
    dispatch(actions.setIsSampleCreateDialogOpen(true));
  }, [dispatch]);
  const isAdmin = useIsAdmin();

  return isAdmin ? (
    <TopToolbar>
      <Button label="Crea" onClick={onClick}>
        <AddIcon />
      </Button>
    </TopToolbar>
  ) : (
    <div />
  );
};

export const SampleList = (props: ListProps) => {
  const { isCreateDialogOpen, renderSampleType, isAdmin } = useSampleList();

  return (
    <>
      <List
        {...props}
        actions={<SampleListActions />}
        filters={<SampleFilters />}
        bulkActionButtons={false}
      >
        <Datagrid>
          <TextField color="secondary" label="Nome" source="name" />
          <FunctionField label="Tipologia" render={renderSampleType} />
          <IsActiveChipField label="Stato" source="disabled" activeOnFalse />
          {isAdmin && <EditButton label="Modifica" />}
        </Datagrid>
      </List>

      <Dialog open={isCreateDialogOpen} fullWidth maxWidth="lg">
        <SampleCreate {...props} />
      </Dialog>
    </>
  );
};
