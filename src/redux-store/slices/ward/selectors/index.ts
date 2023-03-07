import { RootState } from "redux-store";

export const getIsWardCreateDialogOpen = (state: RootState) =>
  state?.wards?.isWardCreateDialogOpen;
