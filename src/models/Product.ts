import { Attachment } from "./Attachment";
import { ProductCategory } from "./ProductCategory";
export interface Product {
  ProductName: string;
  ProductUrl: string;
  ProductPicture: string;
  Disabled: boolean;
  id: number;
  productCategoryId: number;
  productCategory?: ProductCategory;
  attachments?: Attachment[];
}
