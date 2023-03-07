import { Sample } from "models/Sample";

export interface SamplesState {
  list: Sample[];
  isSampleCreateDialogOpen: boolean;
}

export interface SetIsSampleCreateDialogOpenAction {
  payload: boolean;
}

export interface FetchSamplesSuccessAction {
  payload: Sample[];
}

export interface FetchSamplesAction {
  payload: {
    token: string;
  };
}
