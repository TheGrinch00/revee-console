import * as login from "./login";
import * as employee from "./employee";
import * as visit from "./visit";
import * as facility from "./facility";
import * as facilityType from "./facilityType";
import * as member from "./member";
import * as employments from "./employments";
import * as wards from "./ward";
import * as productCategories from "./productCategory";
import * as statistics from "./statistics";
import * as samples from "./samples";
import * as product from "./product";
import * as positions from "./position";

export const reducers = {
  login: login.loginStore.reducer,
  employee: employee.employeeStore.reducer,
  visit: visit.visitStore.reducer,
  member: member.memberStore.reducer,
  employments: employments.employmentStore.reducer,
  facility: facility.facilityStore.reducer,
  wards: wards.wardStore.reducer,
  product: product.productStore.reducer,
  productCategories: productCategories.ProductCategoryStore.reducer,
  statistics: statistics.statisticsStore.reducer,
  samples: samples.sampleStore.reducer,
  facilityTypes: facilityType.facilityTypeStore.reducer,
  position: positions.PositionStore.reducer,
};

export const actions = {
  ...login.loginStore.actions,
  ...employee.employeeStore.actions,
  ...visit.visitStore.actions,
  ...facility.facilityStore.actions,
  ...member.memberStore.actions,
  ...employments.employmentStore.actions,
  ...wards.wardStore.actions,
  ...product.productStore.actions,
  ...productCategories.ProductCategoryStore.actions,
  ...statistics.statisticsStore.actions,
  ...samples.sampleStore.actions,
  ...facilityType.facilityTypeStore.actions,
  ...positions.PositionStore.actions,
};

export const selectors = {
  ...login.selectors,
  ...employee.selectors,
  ...visit.selectors,
  ...facility.selectors,
  ...member.selectors,
  ...employments.selectors,
  ...wards.selectors,
  ...product.selectors,
  ...productCategories.selectors,
  ...statistics.selectors,
  ...samples.selectors,
  ...facilityType.selectors,
  ...positions.selectors,
};

export const sagas = [
  ...Object.values(login.sagas),
  ...Object.values(employee.sagas),
  ...Object.values(visit.sagas),
  ...Object.values(facility.sagas),
  ...Object.values(member.sagas),
  ...Object.values(employments.sagas),
  ...Object.values(wards.sagas),
  ...Object.values(product.sagas),
  ...Object.values(productCategories.sagas),
  ...Object.values(statistics.sagas),
  ...Object.values(samples.sagas),
  ...Object.values(facilityType.sagas),
  ...Object.values(positions.sagas),
];
