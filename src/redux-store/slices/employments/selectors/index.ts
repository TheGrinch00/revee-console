import { RootState } from "../../../../redux-store";

export const getIsEmploymentCreateDialogOpen = (state: RootState) => state?.employments?.isEmploymentCreateDialogOpen;