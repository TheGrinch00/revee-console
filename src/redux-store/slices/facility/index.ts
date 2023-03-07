import { createSlice } from "@reduxjs/toolkit";
import {
  SetIsFacilityCreateDialogOpenAction,
  FacilityState,
} from "./interfaces";
import * as selectors from "./selectors";
import * as sagas from "./sagas";
const initialState: FacilityState = {
  isFacilityCreateDialogOpen: false,
};
export const facilityStore = createSlice({
  name: "facility",
  initialState,
  reducers: {
    setIsFacilityCreateDialogOpen: (
      state,
      action: SetIsFacilityCreateDialogOpenAction
    ) => {
      state.isFacilityCreateDialogOpen = action.payload;
    },
  },
});


export { sagas, selectors };
