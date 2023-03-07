import {
  List,
  Datagrid,
  ListProps,
  EditButton,
  TextField,
  UrlField,
  Filter,
  TopToolbar,
  Button,
  SearchInput,
} from "react-admin";

import { useDispatch } from "react-redux";

import { useCallback } from "react";
import { Dialog } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { useFacilityList } from "./index.hook";
import { FullStreetField } from "components";
import { FacilityCreate } from "..";
import { actions } from "redux-store";

const FacilityFilters = () => (
  <Filter>
    <SearchInput variant="outlined" source="q" alwaysOn />
  </Filter>
);

const FacilityListActions = () => {
  const dispatch = useDispatch();
  const onClick = useCallback(() => {
    dispatch(actions.setIsFacilityCreateDialogOpen(true));
  }, [dispatch]);

  return (
    <TopToolbar>
      <Button label="Crea" onClick={onClick}>
        <AddIcon />
      </Button>
    </TopToolbar>
  );
};

export const FacilityList = (props: ListProps) => {
  const { isCreateDialogOpen, isAdmin } = useFacilityList();
  return (
    <>
      <List
        {...props}
        actions={<FacilityListActions />}
        filters={<FacilityFilters />}
        bulkActionButtons={false}
      >
        <Datagrid>
          <TextField color="secondary" label="Nome" source="FacilityName" />
          <FullStreetField label="Strada" />
          <TextField color="secondary" label="Provincia" source="Division" />
          <TextField color="secondary" label="Regione" source="" />
          <UrlField color="secondary" label="Sito Web" source="Website" />
          {isAdmin && <EditButton label="Modifica" />}
        </Datagrid>
      </List>

      <Dialog open={isCreateDialogOpen} fullWidth maxWidth="lg">
        <FacilityCreate {...props} />
      </Dialog>
    </>
  );
};
