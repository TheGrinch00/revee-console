import { Theme } from "@material-ui/core";
import { createStyles, makeStyles, useTheme } from "@material-ui/styles";
import { useGetAccessToken } from "hooks/useGetAccessToken";
import { useNotify } from "ra-core";
import { useCallback, useEffect } from "react";
import { actions } from "redux-store";
import { useDispatch } from "react-redux";
import { useRedirect } from "react-admin";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fullWidth: { width: "100%" },
    inputBgWhite: {
      "&>*:not(:last-child):not(:first-child)": {
        backgroundColor: "white!important",
      },
    },
  })
);

export const useVisitEdit = (props: any) => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const dispatch = useDispatch();
  const notify = useNotify();
  const redirect = useRedirect();

  const { token } = useGetAccessToken();

  useEffect(() => {
    dispatch(actions.fetchProducts({ token }));
    dispatch(actions.fetchVisitSamples({ token, visitId: props.id }));
    dispatch(actions.fetchVisitProducts({ token, visitId: props.id }));
  }, [dispatch, props.id, token]);

  const onSuccessHandle = useCallback(() => {
    dispatch(actions.postSamples({ token, visitId: props.id }));
    dispatch(actions.patchProducts({ token, visitId: props.id }));
    dispatch(actions.deleteProducts({ token, visitId: props.id }));
    dispatch(actions.resetProducts());
    notify("Visita modificata con successo", "success");
    redirect("/Visits");
  }, [dispatch, token, props.id, notify, redirect]);

  const onFailureHandle = useCallback(() => {
    notify("Visita non modificata", "error");
    redirect("/Visits");
  }, [notify, redirect]);

  return { styles, onSuccessHandle, onFailureHandle };
};
