import { createSlice } from "@reduxjs/toolkit";
import {
  SetIsEmployeeCreateDialogOpenAction,
  EmployeeState,
} from "./interfaces";
import * as selectors from "./selectors";
import * as sagas from "./sagas";

const initialState: EmployeeState = {
  isEmployeeCreateDialogOpen: false,
};

export const employeeStore = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setIsEmployeeCreateDialogOpen: (
      state,
      action: SetIsEmployeeCreateDialogOpenAction
    ) => {
      state.isEmployeeCreateDialogOpen = action.payload;
    },
  },
});
export { sagas, selectors };
