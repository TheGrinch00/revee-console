import { createSlice } from "@reduxjs/toolkit";
import {
  SetIsProductCategoryCreateDialogOpenAction,
  ProductCategoryState,
} from "./interfaces";
import * as selectors from "./selectors";
import * as sagas from "./sagas";

const initialState: ProductCategoryState = {
  isProductCategoryCreateDialogOpen: false,
};

export const ProductCategoryStore = createSlice({
  name: "ProductCategories",
  initialState,
  reducers: {
    setIsProductCategoryCreateDialogOpen: (
      state,
      action: SetIsProductCategoryCreateDialogOpenAction
    ) => {
      state.isProductCategoryCreateDialogOpen = action.payload;
    },
  },
});
export { sagas, selectors };
