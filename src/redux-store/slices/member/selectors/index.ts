import { RootState } from "../../../index";

export const getIsMemberCreateDialogOpen = (state: RootState) =>
  state.member.isMemberCreateDialogOpen;
export const getExpiredDoctors = (state: RootState) =>
  state.member?.expiringDoctors ?? [];
export const getSelectedProvinces = (state: RootState) =>
  state.member?.selectedProvinces ?? [];
