import { RootState } from "../../../index";

export const getIsProductCreateDialogOpen = (state: RootState) =>
  state.product.isProductCreateDialogOpen;

export const getAttachments = (state: RootState) => state.product.attachments;

export const getProductAttachments = (state: RootState) =>
  state.product.productAttachments;


export const getNewAttachments = (state: RootState) =>
  state.product.newAttachments;
