import { createSlice } from "@reduxjs/toolkit";
import {
  SetIsMemberCreateDialogOpenAction,
  MemberState,
  FetchExpiredDoctorsAction,
  FetchExpiredDoctorsSuccessAction,
  SetSelectedProvincesAction,
  ToggleProvincesAction,
  FetchSelectedProvinceAction,
  FetchSelectedProvinceSuccessAction,
} from "./interfaces";
import * as selectors from "./selectors";
import * as sagas from "./sagas";
const initialState: MemberState = {
  isMemberCreateDialogOpen: false,
  expiringDoctors: [],
  selectedProvinces: [],
};
export const memberStore = createSlice({
  name: "member",
  initialState,
  reducers: {
    setIsMemberCreateDialogOpen: (
      state,
      action: SetIsMemberCreateDialogOpenAction
    ) => {
      state.isMemberCreateDialogOpen = action.payload;
    },
    fetchExpiredDoctors: (state, action: FetchExpiredDoctorsAction) => {},
    fetchExpiredDoctorsSuccess: (
      state,
      action: FetchExpiredDoctorsSuccessAction
    ) => {
      state.expiringDoctors = action.payload;
    },
    toggleProvinces: (state, action: ToggleProvincesAction) => {
      if (state.selectedProvinces.indexOf(action.payload) < 0)
        state.selectedProvinces.push(action.payload);
      else
        state.selectedProvinces.splice(
          state.selectedProvinces.indexOf(action.payload),
          1
        );
    },
    resetSelectedProvinces: (state) => {
      state.selectedProvinces = [];
    },
    setSelectedProvinces: (state, action: SetSelectedProvincesAction) => {
      state.selectedProvinces = action.payload;
    },
    fetchSelectedProvince: (state, action: FetchSelectedProvinceAction) => {},
    fetchSelectedProvinceSuccess: (
      state,
      action: FetchSelectedProvinceSuccessAction
    ) => {},
  },
});
export { sagas, selectors };
