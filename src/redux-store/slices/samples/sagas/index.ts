import { call, put, takeEvery } from "redux-saga/effects";
import { fetchEnd, fetchStart, showNotification } from "react-admin";

import { FetchSamplesAction } from "../interfaces";
import { Sample } from "models/Sample";
import { actions } from "redux-store";
import { basename } from "config";

export const FetchSamplesSaga = function* () {
  yield takeEvery(actions.fetchSamples.type, function* (action) {
    const castedAction = action as unknown as FetchSamplesAction;

    const token = castedAction.payload.token;

    yield fetchSamples(token);
  });
};

function* fetchSamples(token: string) {
  yield put(fetchStart());

  const { response } = yield call(async () => {
    const url = `${basename}/api/Samples?access_token=${token}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "platform-identifier": "console",
      },
    });

    return { response };
  });

  if (response.status === 200) {
    const fetchedSamples: Sample[] = yield call(async () => {
      const body = await response.json();

      return body;
    });

    yield put(actions.fetchSamplesSuccess(fetchedSamples));
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
