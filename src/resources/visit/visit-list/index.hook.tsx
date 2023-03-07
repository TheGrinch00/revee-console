import { selectors, actions } from "redux-store";
import { useSelector, useDispatch } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import { TopToolbar, Button } from "react-admin";

const VisitListActions = ({ basePath }: { basePath?: string }) => {
  const dispatch = useDispatch();
  return (
    <TopToolbar>
      <Button
        label="Crea"
        onClick={() => dispatch(actions.setIsVisitCreateDialogOpen(true))}
      >
        <AddIcon />
      </Button>
    </TopToolbar>
  );
};

export const useVisitList = () => {
  const isCreateDialogOpen = useSelector(selectors.getIsVisitCreateDialogOpen);
  return { VisitListActions, isCreateDialogOpen };
};
