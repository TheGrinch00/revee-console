import { useCallback } from "react";
import { useNotify } from "react-admin";

export const useProductCategoryEdit = () => {
  const notify = useNotify();

  const onSuccessHandler = useCallback(() => {
    notify("Categoria modificata con successo", "success");
  }, [notify]);

  const onFailureHandler = useCallback(() => {
    notify("Errore durante la modifica della categoria", "error");
  }, [notify]);

  return { onSuccessHandler, onFailureHandler };
};
