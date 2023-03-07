import { usePermissions } from "react-admin";
import { useMemo } from "react";
import { Roles } from "redux-store/slices/login/interfaces";

export const useIsAdmin = () => {
  const { permissions } = usePermissions();
  return useMemo(() => (permissions as Roles) === Roles.ADMIN, [permissions]);
};
