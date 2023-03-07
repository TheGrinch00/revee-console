import { RootState } from "redux-store";

export const getSamples = (state: RootState) => state.samples?.list ?? [];
export const getIsSampleCreateDialogOpen = (state: RootState) =>
  state?.samples?.isSampleCreateDialogOpen ?? false;
