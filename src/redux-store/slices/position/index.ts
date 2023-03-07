import { createSlice } from "@reduxjs/toolkit";
import {
  SetIsPositionCreateDialogOpenAction,
  PositionState,
} from "./interfaces";
import * as selectors from "./selectors";
import * as sagas from "./sagas";
const initialState: PositionState = {
  isPositionCreateDialogOpen: false,
};
export const PositionStore = createSlice({
  name: "Position",
  initialState,
  reducers: {
    setIsPositionCreateDialogOpen: (
      state,
      action: SetIsPositionCreateDialogOpenAction
    ) => {
      state.isPositionCreateDialogOpen = action.payload;
    },
  },
});

export { sagas, selectors };
