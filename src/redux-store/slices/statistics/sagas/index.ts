import {
  FetchStatisticAction,
  FetchStatisticSuccessAction,
} from "../interfaces";
import { call, put, takeEvery } from "redux-saga/effects";
import { fetchEnd, fetchStart } from "react-admin";

import { actions } from "./../../../../redux-store";
import { basename } from "config";
import { showNotification } from "ra-core";

export const FetchStatisticSaga = function* () {
  yield takeEvery(actions.fetchStatistics.type, function* (action) {
    const castedAction = action as unknown as FetchStatisticAction;

    const token = castedAction.payload.token;
    const general = castedAction.payload.general;
    const id = castedAction.payload.id;
    yield FetchStatistic(token, general, id);
  });
};

function* FetchStatistic(token: string, general: boolean, id: string) {
  yield put(fetchStart());

  const { response } = yield call(async () => {
    const url = `${basename}/api/Members/${id}/stats?general=${general}&access_token=${token}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "platform-identifier": "console",
      },
    });

    return { response };
  });

  if (response.status === 200) {
    const responseBody: FetchStatisticSuccessAction = yield call(async () => {
      const body: FetchStatisticSuccessAction = await response.json();

      return { payload: body };
    });
    yield put(actions.fetchStatisticSuccess(responseBody.payload));
  } else {
    switch (response.status) {
      case 400:
        yield put(
          showNotification(
            "Si è verificato un errore durante la richiesta",
            "error"
          )
        );
        break;
      case 401:
        yield put(
          showNotification(
            "Il tuo account non è autorizzato ad accedere",
            "error"
          )
        );
        break;
      case 404:
        yield put(showNotification("Risorsa non trovata", "error"));
        break;
      case 500:
        yield put(showNotification("Il server non risponde", "error"));
        break;
    }
  }

  yield put(fetchEnd());
}
