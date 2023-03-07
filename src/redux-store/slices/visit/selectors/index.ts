import { RootState } from "redux-store";

export const getIsVisitCreateDialogOpen = (state: RootState) =>
  state?.visit?.isVisitCreateDialogOpen ?? [];
export const getPositions = (state: RootState) => state?.visit?.positions ?? [];
export const getProducts = (state: RootState) => state?.visit?.products ?? [];
export const getProductsPerCategory = (state: RootState) =>
  state?.visit?.productsPerCategory ?? [];
export const getVisitProducts = (state: RootState) =>
  state?.visit?.visitProductsIds ?? [];
export const getVisitSamples = (state: RootState) =>
  state?.visit?.visitSamples ?? [];
  export const getUpdatedProducts = (state: RootState) =>
  state?.visit?.updatedProductsIds ?? [];
export const getMemberAgents = (state: RootState) => state?.visit?.agents ?? [];
export const getVisitCreateCurrentStep = (state: RootState) =>
  state?.visit?.visitCreateCurrentStep ?? 0;
export const getIsVisitCreateStepperNextButtonDisabled = (state: RootState) =>
  false;
