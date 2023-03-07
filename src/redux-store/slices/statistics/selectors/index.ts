import { RootState } from "../../../index";

export const getStatistics = (state: RootState) =>
  state!.statistics!.statistics;
export const getMedsPerProvince = (state: RootState) =>
  state?.statistics?.medsPerProvinces ?? [];
export const getMedsPerCategory = (state: RootState) =>
  state?.statistics?.medsPerCategory ?? [];
export const getVisitedEmplyess = (state: RootState) =>
  state!.statistics!.visitedEmployees;
export const getNewMeds = (state: RootState) => state!.statistics!.newMeds;
export const getSamplesStat = (state: RootState) => state!.statistics!.samples;
