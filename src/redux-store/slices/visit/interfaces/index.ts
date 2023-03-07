import { Product } from "models/Product";
import { VisitSample } from "models/VisitSample";
import internal from "stream";

export interface SetIsVisitCreateDialogOpenAction {
  payload: boolean;
}
export interface ToggleProductAction {
  payload: number;
}

export interface SetSampleQuantityAction {
  payload: {
    sampleId: number;
    quantity: number;
  }
}
export interface VisitState {
  isVisitCreateDialogOpen: boolean;
  visitCreateCurrentStep: 0 | 1 | 2 | 3 | 4;
  positions: any[];
  products: Product[];
  productsPerCategory: { name: string; products: Product[] }[];
  visitProductsIds: number[];
  visitSamples: VisitSample[];
  updatedProductsIds: number[];
  agents: any[];
}

export interface SetVisitCreateStepAction {
  payload: 0 | 1 | 2 | 3 | 4;
}

export interface FetchPositionsAction {
  payload: { token: string; positionId: number };
}
export interface FetchPositionsSuccessAction {
  payload: any[];
}

export interface FetchMemberAgentsAction {
  payload: { token: string };
}
export interface FetchMemberAgentsSuccessAction {
  payload: any[];
}

export interface FetchProductsAction {
  payload: { token: string };
}
export interface FetchVisitSamplesAction {
  payload: { token: string, visitId: number };
}
export interface FetchVisitSamplesSuccessAction {
  payload: {
    visitSamples: VisitSample[];
  };
}
export interface FetchVisitProductsAction {
  payload: { token: string, visitId: number };
}
export interface FetchVisitProductsSuccessAction {
  payload: {
    visitProducts: Product[];
  };
}
export interface FetchProductsSuccessAction {
  payload: {
    products: Product[];
    productsPerCategory: {
      name: string;
      products: Product[];
    }[];
  };
}

export interface PostProductsAction {
  payload: { token: string; visitId: number };
}
export interface PatchProductsAction {
  payload: { token: string; visitId: number };
}
export interface DeleteProductsAction {
  payload: { token: string; visitId: number };
}



export interface PostSamplesAction {
  payload: { token: string; visitId: number };
}

export interface PostProductsSuccessAction {}
