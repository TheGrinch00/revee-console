import * as sagas from "./sagas";
import * as selectors from "./selectors";

import {
  AddAttachment,
  FetchAttachmentsAction,
  FetchAttachmentsSuccessAction,
  PostAttachmentsAction,
  PostAttachmentsSuccessAction,
  ProductState,
  RemoveAttachment,
  RemoveProductAttachmentAction,
  RemoveProductAttachmentSuccessAction,
  ResetAttachments,
  SetIsProductCreateDialogOpenAction,
  UploadAttachmentsAction,
  UploadAttachmentsSuccessAction,
} from "./interfaces";

import { basename } from "config";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ProductState = {
  isProductCreateDialogOpen: false,
  attachments: [],
  productAttachments: [],
  newAttachments: [],
};
export const productStore = createSlice({
  name: "Product",
  initialState,
  reducers: {
    setIsProductCreateDialogOpen: (
      state,
      action: SetIsProductCreateDialogOpenAction
    ) => {
      state.isProductCreateDialogOpen = action.payload;
    },
    fetchAttachments: (state, action: FetchAttachmentsAction) => {},
    fetchAttachmentsSuccess: (state, action: FetchAttachmentsSuccessAction) => {
      state.attachments = action.payload;
    },
    addAttachment: (state, action: AddAttachment) => {
      if (state.productAttachments.indexOf(action.payload) < 0) {
        state.productAttachments.push(action.payload);
      }
    },
    removeAttachment: (state, action: RemoveAttachment) => {
      state.productAttachments = state.productAttachments.filter(
        (e) => JSON.stringify(e) !== JSON.stringify(action.payload)
      );
    },
    resetAttachments: (state, action: ResetAttachments) => {
      state.productAttachments = [];
    },
    resetNewAttachments: (state, action: {payload: boolean}) => {
      state.newAttachments = [];
    },
    uploadAttachments: (state, action: UploadAttachmentsAction) => {},
    uploadAttachmentsSuccess: (
      state,
      action: UploadAttachmentsSuccessAction
    ) => {
      const files = action.payload.result.files;
      Object.keys(action.payload.result.files).forEach((key: string) => {
        let container = files[key][0].type.includes("image")
          ? "revee-storage-images"
          : "revee-storage-pdfs";
        state.newAttachments.push({
          details: files[key][0].originalFilename,
          fileUrl: `${basename}/api/storages/${container}/download/${files[key][0].name}`,
          attachmentType: "Product",
          type: files[key][0].type.includes("image") ? "IMG" : "DOC",
        });
      });
    },
    postAttachments: (state, action: PostAttachmentsAction) => {},
    postAttachmentsSuccess: (state, action: PostAttachmentsSuccessAction) => {
    },
    removeProductAttachment: (state, action: RemoveProductAttachmentAction) => {},
    removeProductAttachmentSuccess: (state, action: RemoveProductAttachmentSuccessAction) => {
    },
  },

});

export { sagas, selectors };
