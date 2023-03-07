import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../../redux-store";
import { useGetAccessToken } from "../../hooks/useGetAccessToken";

export const useVisitEditSamplesSelection = () => {
  const dispatch = useDispatch();

  const { token } = useGetAccessToken();

  const samples = useSelector(selectors.getSamples);

  useEffect(() => {
    dispatch(actions.fetchSamples({ token }));
  }, [token, dispatch]);

  return { samples };
};
