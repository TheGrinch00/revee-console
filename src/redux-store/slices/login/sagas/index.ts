import {
  LoginStep,
  SendAuthCodeAction,
  SendGoogleJwtAction,
  SuccessLoopbackGoogleLoginResponse,
} from "../interfaces";
import { call, put, takeEvery } from "redux-saga/effects";

import { actions } from "redux-store";
import { basename } from "config";
import { showNotification } from "react-admin";

export const authSaga = function* () {
  yield takeEvery(actions.sendGoogleJwt.type, function* (action) {
    const payload = (action as unknown as SendGoogleJwtAction).payload;
    const captchaToken = payload.recaptchaToken;
    const jwt = payload.jwt;

    yield performLoopbackLogin(captchaToken, jwt);
  });

  // When loopback answers successfully in JWT step
  yield takeEvery(actions.googleLoginSuccess.type, function* () {
    yield put(actions.setLoginStatus(LoginStep.TWO_FA));
  });

  // Called when the 6-digit code is wrong
  yield takeEvery(actions.twoFactorCodeError.type, function* () {
    yield put(actions.reset2fa());
    yield put(showNotification("Il codice è errato, prova di nuovo", "error"));
  });

  // Called when user wants to send 2FA code
  yield takeEvery(actions.sendAuthCode.type, function* (action) {
    const castedAction = action as unknown as SendAuthCodeAction;

    const code = castedAction.payload.code;
    const sessionInfo = castedAction.payload.sessionInfo;

    yield performLoopback2faCheck(code, sessionInfo);
  });
};

function* performLoopbackLogin(captchaToken: string, jwt: string) {
  const { response: lbGoogleResponse } = yield call(async () => {
    const loginUrl = `${basename}/login/`;
    const lbGoogleRequestBody = `captchaToken=${captchaToken}&googleJwt=${jwt}`;

    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "platform-identifier": "console",
      },
      body: lbGoogleRequestBody,
    });

    return { response };
  });

  if (lbGoogleResponse.status === 200) {
    const responseBody: SuccessLoopbackGoogleLoginResponse = yield call(
      async () => {
        const body: SuccessLoopbackGoogleLoginResponse =
          await lbGoogleResponse.json();
        return body;
      }
    );

    yield put(
      actions.googleLoginSuccess({
        lastThreePhoneDigits: responseBody.phoneNumber,
        sessionInfo: responseBody.sessionInfo,
      })
    );
  } else {
    switch (lbGoogleResponse.status) {
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
}

function* performLoopback2faCheck(code: string, sessionInfo: string) {
  const { ...lbCodeResponse } = yield call(async () => {
    const verifyCodeUrl =
      `${basename}/api/OTPs/verify/`;
    const lbCodeRequestBody = `otp=${code}&sessionInfo=${sessionInfo}`;

    const response = await fetch(verifyCodeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "platform-identifier": "console",
      },
      body: lbCodeRequestBody,
    });

    return await response.json();
  });

  if (lbCodeResponse.error) {
    yield put(actions.twoFactorCodeError());
  } else {
    yield put(
      actions.twoFactorCodeSuccess({
        accessToken: lbCodeResponse.data.token.id,
        role: lbCodeResponse.data.role,
      })
    );

    localStorage.setItem("role",  lbCodeResponse.data.role);
  }
}
