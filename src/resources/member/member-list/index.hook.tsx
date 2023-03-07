import { selectors, actions } from "../../../redux-store";
import { useSelector, useDispatch } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import { Filter, TopToolbar, Button, SearchInput } from "react-admin";
import { useCallback } from "react";
import { useIsAdmin } from "hooks/useIsAdmin";

const MemberFilters = () => (
  <Filter>
    <SearchInput variant="outlined" source="q" alwaysOn />
  </Filter>
);

const MemberListActions = ({ basePath }: { basePath?: string }) => {
  const dispatch = useDispatch();
  const onCreateButtonClicked = useCallback(
    () => dispatch(actions.setIsMemberCreateDialogOpen(true)),
    [dispatch]
  );

  const isAdmin = useIsAdmin();

  return isAdmin ? (
    <TopToolbar>
      <Button label="Crea" onClick={onCreateButtonClicked}>
        <AddIcon />
      </Button>
    </TopToolbar>
  ) : (
    <div />
  );
};
const MemberTitle = () => {
  return <span>Agenti</span>;
};

export const useMemberList = () => {
  const isMemberCreateDialogOpen = useSelector(
    selectors.getIsMemberCreateDialogOpen
  );

  const isAdmin = useIsAdmin();

  return {
    MemberFilters,
    MemberListActions,
    isMemberCreateDialogOpen,
    MemberTitle,
    isAdmin,
  };
};
