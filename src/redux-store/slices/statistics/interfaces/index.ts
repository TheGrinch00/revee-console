export interface FetchStatisticAction {
    payload: { token: string; general: boolean; id: string };
}

export interface FetchStatisticSuccessAction {
    payload: {
        success: any;
    };
}

export interface StatisticObject {
    name: string,
    value: number,
}

export interface StatisticState {
    statistics: any;
    newMeds: any[];
    visitedEmployees: any[];
    samples: any[];
    medsPerProvinces: StatisticObject[],
    medsPerCategory: StatisticObject[],
}
