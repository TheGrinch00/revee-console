import { RootState } from "../../../index";

export const getIsFacilityCreateDialogOpen = (state: RootState) =>
  state.facility.isFacilityCreateDialogOpen;
