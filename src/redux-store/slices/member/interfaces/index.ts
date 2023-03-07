import { Employee } from "models/Employee";

export interface SetIsMemberCreateDialogOpenAction {
  payload: boolean;
}
export interface ToggleProvincesAction {
  payload: string;
}   

export interface FetchSelectedProvinceAction {
  payload: { provinces: string[]; token: string; memberId: number };
}
export interface FetchSelectedProvinceSuccessAction {
  payload: {
    success: boolean;
  };
}

export interface SetSelectedProvincesAction {
  payload: string[];
}
export interface FetchExpiredDoctorsAction {
  payload: { memberId: number; token: string };
}

export interface FetchExpiredDoctorsSuccessAction {
  payload: (Employee & {
    category: {
      Category: "Fascia A" | "Fascia B";
      Regularity: 30 | 60;
      id: number;
    };
    daysExpired: number;
  })[];
}

export interface MemberState {
  isMemberCreateDialogOpen: boolean;
  expiringDoctors: (Employee & {
    category: {
      Category: "Fascia A" | "Fascia B";
      Regularity: 30 | 60;
      id: number;
    };
    daysExpired: number;
  })[];
  selectedProvinces: string[];
}
