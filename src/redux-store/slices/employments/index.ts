import { createSlice } from "@reduxjs/toolkit";
import {
  SetIsEmploymentCreateDialogOpenAction,
  EmploymentsState,
} from "./interfaces";
import * as selectors from "./selectors";
import * as sagas from "./sagas";

const initialState: EmploymentsState = {
  isEmploymentCreateDialogOpen: false,
};

export const employmentStore = createSlice({
  name: "employment",
  initialState,
  reducers: {
    setIsEmploymentCreateDialogOpen: (
      state,
      action: SetIsEmploymentCreateDialogOpenAction
    ) => {
      state.isEmploymentCreateDialogOpen = action.payload;
    },
  },
});
export { sagas, selectors };
