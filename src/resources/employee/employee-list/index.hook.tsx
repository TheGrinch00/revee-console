import { selectors, actions } from "redux-store";
import { useSelector, useDispatch } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import {
  TopToolbar,
  Button,
  ReferenceInput,
  SelectInput,
  FilterButton,
  Filter,
  SearchInput,
} from "react-admin";
import { useCallback } from "react";
import { useIsAdmin } from "hooks/useIsAdmin";

const filters = [
  <SearchInput variant="outlined" source="q" alwaysOn />,
  <ReferenceInput
    variant="outlined"
    label="Categoria"
    source="CategoryId"
    reference="Categories"
  >
    <SelectInput optionText="Category" emptyText="Tutte" />
  </ReferenceInput>,
];

const EmployeeFilters = () => <Filter>{filters}</Filter>;

const EmployeeListActions = ({ basepath }: { basepath?: string }) => {
  const dispatch = useDispatch();
  const onEmployeeCreateButtonClicked = useCallback(
    () => dispatch(actions.setIsEmployeeCreateDialogOpen(true)),
    [dispatch]
  );
  const isAdmin = useIsAdmin();

  return (
    <TopToolbar>
      <FilterButton filters={filters} />
      {isAdmin ? (
        <Button label="Crea" onClick={onEmployeeCreateButtonClicked}>
          <AddIcon />
        </Button>
      ) : (
        <div />
      )}
    </TopToolbar>
  );
};

export const useEmployeeList = () => {
  const isCreateDialogOpen = useSelector(
    selectors.getIsEmployeeCreateDialogOpen
  );
  const isAdmin = useIsAdmin();
  return { EmployeeListActions, EmployeeFilters, isCreateDialogOpen, isAdmin };
};
