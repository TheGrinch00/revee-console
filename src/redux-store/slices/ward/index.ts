import { createSlice } from "@reduxjs/toolkit";
import { SetIsWardCreateDialogOpenAction, WardsState } from "./interfaces";
import * as selectors from "./selectors";
import * as sagas from "./sagas";

const initialState: WardsState = {
  isWardCreateDialogOpen: false,
};

export const wardStore = createSlice({
  name: "ward",
  initialState,
  reducers: {
    setIsWardCreateDialogOpen: (
      state,
      action: SetIsWardCreateDialogOpenAction
    ) => {
      state.isWardCreateDialogOpen = action.payload;
    },
  },
});
export { sagas, selectors };
