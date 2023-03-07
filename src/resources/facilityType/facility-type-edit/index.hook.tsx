import { useCallback } from "react";
import { useNotify } from "react-admin";

export const useFacilityTypeEdit = () => {
  const notify = useNotify();

  const onSuccessHandler = useCallback(() => {
    notify("Tipologia modificata con successo", "success");
  }, [notify]);

  const onFailureHandler = useCallback(() => {
    notify("Errore durante la modifica della tipologia", "error");
  }, [notify]);

  return { onSuccessHandler, onFailureHandler };
};
