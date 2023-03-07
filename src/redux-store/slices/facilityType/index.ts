import { createSlice } from "@reduxjs/toolkit";
import {
  SetIsFacilityTypeCreateDialogOpenAction,
  FacilityTypesState,
} from "./interfaces";
import * as selectors from "./selectors";
import * as sagas from "./sagas";

const initialState: FacilityTypesState = {
  isFacilityTypeCreateDialogOpen: false,
};

export const facilityTypeStore = createSlice({
  name: "facilityType",
  initialState,
  reducers: {
    setIsFacilityTypeCreateDialogOpen: (
      state,
      action: SetIsFacilityTypeCreateDialogOpenAction
    ) => {
      state.isFacilityTypeCreateDialogOpen = action.payload;
    },
  },
});
export { sagas, selectors };
