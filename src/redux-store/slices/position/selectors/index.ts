import { RootState } from "../../../index";

export const getIsPositionCreateDialogOpen = (state: RootState) =>
  state.position.isPositionCreateDialogOpen;
