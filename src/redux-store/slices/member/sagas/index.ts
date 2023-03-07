import {
  FetchExpiredDoctorsAction,
  FetchExpiredDoctorsSuccessAction,
  FetchSelectedProvinceAction,
  FetchSelectedProvinceSuccessAction,
} from "../interfaces";
import { call, put, takeEvery } from "redux-saga/effects";
import { fetchEnd, fetchStart } from "react-admin";

import { actions } from "redux-store";
import { basename } from "config";
import { showNotification } from "ra-core";

export const FetchExpiredDoctorsSaga = function* () {
  yield takeEvery(actions.fetchExpiredDoctors.type, function* (action) {
    const castedAction = action as unknown as FetchExpiredDoctorsAction;

    const id = castedAction.payload.memberId;
    const token = castedAction.payload.token;

    yield fetchExpiredDoctors(id, token);
  });
};

function* fetchExpiredDoctors(id: number, token: string) {
  yield put(fetchStart());

  const { response } = yield call(async () => {
    const url = `${basename}/api/Members/${id}/expired?access_token=${token}`;

    const response = await fetch(url);

    return { response };
  });

  if (response.status === 200) {
    const responseBody: FetchExpiredDoctorsSuccessAction = yield call(
      async () => {
        const body: FetchExpiredDoctorsSuccessAction = await response.json();

        return { payload: body };
      }
    );
    yield put(actions.fetchExpiredDoctorsSuccess(responseBody.payload));
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

export const FetchSelectedProvinceSaga = function* () {
  yield takeEvery(actions.fetchSelectedProvince.type, function* (action) {
    const castedAction = action as unknown as FetchSelectedProvinceAction;

    const provinces = castedAction.payload.provinces;
    const id = castedAction.payload.memberId;
    const token = castedAction.payload.token;

    yield FetchSelectedProvince(provinces, id, token);
  });
};

function* FetchSelectedProvince(
  provinces: string[],
  id: number,
  token: string
) {
  yield put(fetchStart());

  const { response } = yield call(async () => {
    const url = `${basename}/api/Members/${id}/provinces?access_token=${token}`;
    const encodedKey = encodeURIComponent("list");
    const encodedValue = encodeURIComponent(`["${provinces.join('", "')}"]`);
    const body = encodedKey + "=" + encodedValue;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "platform-identifier": "console",
      },
      body: body,
    });

    return { response };
  });

  if (response.status === 200) {
    const responseBody: FetchSelectedProvinceSuccessAction = yield call(
      async () => {
        const body: FetchSelectedProvinceSuccessAction = await response.json();

        return { payload: body };
      }
    );
    yield put(actions.fetchSelectedProvinceSuccess(responseBody.payload));
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

export const FetchSelectedProvinceSuccessSaga = function* () {
  yield takeEvery(
    actions.fetchSelectedProvinceSuccess.type,
    function* (action) {
      const castedAction =
        action as unknown as FetchSelectedProvinceSuccessAction;

      const success = castedAction.payload.success;
      if (success) {
        yield put(showNotification("Permessi aggiornati", "success"));
      }
    }
  );
};
