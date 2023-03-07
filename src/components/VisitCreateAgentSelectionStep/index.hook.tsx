import { useGetAccessToken } from "hooks/useGetAccessToken";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "redux-store";

export const useVisitCreateAgentSelectionStep = () => {
  const { token } = useGetAccessToken();
  const choices = useSelector(selectors.getMemberAgents);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchMemberAgents({ token }));
  }, [dispatch, token]);

  return { choices };
};
