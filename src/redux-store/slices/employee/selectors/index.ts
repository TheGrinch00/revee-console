import { RootState } from "../../../index";

export const getIsEmployeeCreateDialogOpen = (state: RootState) =>
  state.employee.isEmployeeCreateDialogOpen;
