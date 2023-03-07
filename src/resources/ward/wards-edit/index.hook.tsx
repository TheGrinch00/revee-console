import { useCallback } from "react";
import { useNotify } from "react-admin";

export const useWardEdit = () => {
  const notify = useNotify();

  const onSuccessHandler = useCallback(() => {
    notify("Reparto modificato con successo", "success");
  }, [notify]);

  const onFailureHandler = useCallback(() => {
    notify("Errore durante la modifica del reparto", "error");
  }, [notify]);

  return { onSuccessHandler, onFailureHandler };
};
