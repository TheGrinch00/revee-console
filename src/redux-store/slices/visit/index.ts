import { createSlice } from "@reduxjs/toolkit";
import {
  FetchPositionsAction,
  FetchPositionsSuccessAction,
  FetchProductsAction,
  FetchProductsSuccessAction,
  SetIsVisitCreateDialogOpenAction,
  SetVisitCreateStepAction,
  VisitState,
  ToggleProductAction,
  SetSampleQuantityAction,
  PostProductsAction,
  PostProductsSuccessAction,
  FetchMemberAgentsAction,
  FetchMemberAgentsSuccessAction,
  PostSamplesAction,
  FetchVisitSamplesSuccessAction,
  FetchVisitSamplesAction,
  FetchVisitProductsSuccessAction,
  FetchVisitProductsAction,
  PatchProductsAction,
  DeleteProductsAction,
} from "./interfaces";
import * as selectors from "./selectors";
import * as sagas from "./sagas";
import { enableMapSet } from "immer";

enableMapSet();
const initialState: VisitState = {
  isVisitCreateDialogOpen: false,
  visitCreateCurrentStep: 0,
  positions: [],
  products: [],
  productsPerCategory: [],
  visitProductsIds: [],
  updatedProductsIds: [],
  visitSamples: [],
  agents: [],
};
export const visitStore = createSlice({
  name: "Visit",
  initialState,
  reducers: {
    setIsVisitCreateDialogOpen: (
      state,
      action: SetIsVisitCreateDialogOpenAction
    ) => {
      state.isVisitCreateDialogOpen = action.payload;
    },
    setVisitCreateStep: (state, action: SetVisitCreateStepAction) => {
      state.visitCreateCurrentStep = action.payload;
    },
    fetchPositions: (state, action: FetchPositionsAction) => {},
    fetchPositionsSuccess: (state, action: FetchPositionsSuccessAction) => {
      state.positions = action.payload;
    },
    fetchProducts: (state, action: FetchProductsAction) => {},
    fetchProductsSuccess: (state, action: FetchProductsSuccessAction) => {
      state.products = action.payload.products;
      state.productsPerCategory = action.payload.productsPerCategory;
    },
    fetchVisitSamples: (state, action: FetchVisitSamplesAction) => {},
    fetchVisitSamplesSuccess: (
      state,
      action: FetchVisitSamplesSuccessAction
    ) => {
      state.visitSamples = action.payload.visitSamples;
    },
    fetchVisitProducts: (state, action: FetchVisitProductsAction) => {},
    fetchVisitProductsSuccess: (
      state,
      action: FetchVisitProductsSuccessAction
    ) => {
      state.visitProductsIds = action.payload.visitProducts.map(
        (prod) => prod.id
      );
      state.updatedProductsIds = action.payload.visitProducts.map(
        (prod) => prod.id
      );
    },
    toggleProduct: (state, action: ToggleProductAction) => {
      if (state.visitProductsIds.includes(action.payload)) {
        state.visitProductsIds = state.visitProductsIds.filter(
          (productId) => productId !== action.payload
        );
      } else {
        state.visitProductsIds.push(action.payload);
      }
    },
    toggleUpdatedProduct: (state, action: ToggleProductAction) => {
      if (state.updatedProductsIds.includes(action.payload)) {
        state.updatedProductsIds = state.updatedProductsIds.filter(
          (productId) => productId !== action.payload
        );
      } else {
        state.updatedProductsIds.push(action.payload);
      }
    },
    setSampleQuantity: (state, action: SetSampleQuantityAction) => {
      const { sampleId, quantity } = action.payload;

      if (quantity >= 0) {
        const sampleIndex = state.visitSamples.findIndex(
          (visitSample) => visitSample.sampleId === sampleId
        );

        if (sampleIndex !== -1) {
          state.visitSamples[sampleIndex].quantity = quantity;
        } else {
          state.visitSamples.push(action.payload);
        }
      } 
    },
    resetProducts: (state) => {
      state.visitProductsIds = [];
      state.updatedProductsIds = [];
    },
    postProducts: (state, action: PostProductsAction) => {},
    postSamples: (state, action: PostSamplesAction) => {},
    patchProducts: (state, action: PatchProductsAction) => {},
    deleteProducts: (state, action: DeleteProductsAction) => {},
    postProductsSuccess: (state, action: PostProductsSuccessAction) => {
      state.visitProductsIds = [];
    },
    patchProductsSuccess: (state, action: PostProductsSuccessAction) => {},
    deleteProductsSuccess: (state, action: PostProductsSuccessAction) => {},
    postSamplesSuccess: (state, action: PostProductsSuccessAction) => {
      state.visitSamples = [];
    },
    fetchMemberAgents: (state, action: FetchMemberAgentsAction) => {},
    fetchMemberAgentsSuccess: (
      state,
      action: FetchMemberAgentsSuccessAction
    ) => {
      state.agents = action.payload;
    },
  },
});
export { sagas, selectors };
