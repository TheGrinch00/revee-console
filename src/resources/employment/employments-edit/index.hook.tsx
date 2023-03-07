import { useCallback } from "react";
import { useNotify } from "react-admin";

export const useEmploymentEdit = () => {
  const notify = useNotify();

  const onSuccessHandler = useCallback(() => {
    notify("Impiego modificato con successo", "success");
  }, [notify]);

  const onFailureHandler = useCallback(() => {
    notify("Errore durante la modifica dell'impiego", "error");
  }, [notify]);

  return { onSuccessHandler, onFailureHandler };
};
