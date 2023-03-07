import { createSlice } from "@reduxjs/toolkit";
import {
  SamplesState,
  FetchSamplesSuccessAction,
  FetchSamplesAction,
  SetIsSampleCreateDialogOpenAction,
} from "./interfaces";
import * as selectors from "./selectors";
import * as sagas from "./sagas";

const initialState: SamplesState = {
  list: [],
  isSampleCreateDialogOpen: false,
};

export const sampleStore = createSlice({
  name: "sample",
  initialState,
  reducers: {
    fetchSamples: (state, action: FetchSamplesAction) => {},
    fetchSamplesSuccess: (state, action: FetchSamplesSuccessAction) => {
      state.list = action.payload;
    },
    setIsSampleCreateDialogOpen: (
      state,
      action: SetIsSampleCreateDialogOpenAction
    ) => {
      state.isSampleCreateDialogOpen = action.payload;
    },
  },
});

export { sagas, selectors };
