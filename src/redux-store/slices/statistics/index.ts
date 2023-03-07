import { createSlice } from "@reduxjs/toolkit";
import {
  FetchStatisticAction,
  FetchStatisticSuccessAction,
  StatisticState,
} from "./interfaces";
import * as selectors from "./selectors";
import * as sagas from "./sagas";

const initialState: StatisticState = {
  statistics: {
    medsPerCategory: {},
    medsPerProvince: {},
    newMedsPerCategory: {},
    newMedsPerProvince: {},
    newMeds: {},
    visitedEmployees: {},
    samples: {},
  },
  medsPerProvinces: [],
  medsPerCategory: [],
  newMeds: [],
  visitedEmployees: [],
  samples: [],
};
export const statisticsStore = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    fetchStatistics: (state, action: FetchStatisticAction) => {},
    fetchStatisticSuccess: (state, action: FetchStatisticSuccessAction) => {
      state.statistics = action.payload;
      state.medsPerCategory = [];
      state.medsPerProvinces = [];
      state.newMeds = [];
      state.visitedEmployees = [];
      state.samples = [];

      if (state.statistics.newMedsPerCategory)
        state.statistics.medsPerCategory = state.statistics.newMedsPerCategory;
      if (state.statistics.newMedsPerProvinces)
        state.statistics.medsPerProvinces =
          state.statistics.newMedsPerProvinces;

      if (state.statistics.medsPerCategory)
        for (const [key, value] of Object.entries(
          state.statistics!.medsPerCategory
        )) {
          state.medsPerCategory.push({ name: key, value: value as number });
        }
      if (state.statistics.medsPerProvinces)
        for (const [key, value] of Object.entries(
          state.statistics!.medsPerProvinces
        )) {
          state.medsPerProvinces.push({ name: key, value: value as number });
        }
      if (state.statistics.medsPerProvinces)
        for (const [key, value] of Object.entries(
          state.statistics!.medsPerProvinces
        )) {
          state.medsPerProvinces.push({ name: key, value: value as number });
        }

      if (state.statistics.newMeds)
        for (const [key, value] of Object.entries(state.statistics!.newMeds)) {
          state.newMeds.push({ name: key, value: value });
        }

      if (state.statistics.visitedEmployees)
        for (const [key, value] of Object.entries(
          state.statistics!.visitedEmployees
        )) {
          state.visitedEmployees.push({ name: key, value: value });
        }

      if (state.statistics.samples)
        for (const [key, value] of Object.entries(state.statistics!.samples)) {
          state.samples.push({ name: key, value: value });
        }
    },
  },
});
export { sagas, selectors };
