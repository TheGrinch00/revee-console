import { RootState } from "redux-store";

export const getIsFacilityTypeCreateDialogOpen = (state: RootState) =>
  state?.facilityTypes?.isFacilityTypeCreateDialogOpen;
