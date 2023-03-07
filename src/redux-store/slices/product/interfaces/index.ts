import { Attachment } from "models/Attachment";

export interface SetIsProductCreateDialogOpenAction {
    payload: boolean;
  }
  export interface ProductState {
    isProductCreateDialogOpen: boolean;
    attachments: Attachment[];
    productAttachments: any[];
    newAttachments: any[];
  }
  export interface FetchAttachmentsAction {
    payload: { productId: number; token: string };
  }
  export interface ResetAttachments {
  }
  export interface FetchAttachmentsSuccessAction {
    payload: any[];
  }
  
export interface AddAttachment {  
    payload: any;
} 
  
export interface RemoveAttachment {
    payload: any;
}
  
export interface UploadAttachmentsAction {
    payload: {token: string, attachment_ID: number}
}

export interface UploadAttachmentsSuccessAction {
  payload: { result: {
    files: any;
  }};
}
export interface PostAttachmentsAction {
  payload: { token: string; attachment_ID: number };
}
export interface PostAttachmentsSuccessAction {
  payload: { success: boolean };
}

export interface RemoveProductAttachmentAction {
  payload: {token: string, attachmentId: number, productId: number}
}

export interface RemoveProductAttachmentSuccessAction {
  payload: {success: boolean}
}
