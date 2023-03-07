import { createSlice } from "@reduxjs/toolkit";
import {
  LoginState,
  LoginStep,
  SetLoginStatusAction,
  SendGoogleJwtAction,
  SetDigitAction,
  SetIsVerifying2FaAction,
  SendAuthCodeAction,
  TwoFactorCodeSuccessAction,
  SetTempAccessTokenAction,
  GoogleLoginSuccessAction,
} from "./interfaces";
import * as selectors from "./selectors";
import * as sagas from "./sagas";

const initialState: LoginState = {
  loginStep: LoginStep.IDLE,
  verificationCode: new Array(6).fill("_"),
  currentIndex: 0,
  isVerifying2Fa: false,
  tempAccessToken: "",
  lastThreePhoneDigits: "",
  sessionInfo: "",
};

export const loginStore = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoginStatus: (state, action: SetLoginStatusAction) => {
      state.loginStep = action.payload;
    },
    sendGoogleJwt: (state, action: SendGoogleJwtAction) => {
      // Questo mi serve solo per definire la action
    },
    updateDigit: (state, action: SetDigitAction) => {
      if (state.currentIndex < 6) {
        state.verificationCode[state.currentIndex] = action.payload.value;
        state.currentIndex = state.currentIndex + 1;
      }
    },
    deleteLastDigit: (state) => {
      state.currentIndex = Math.max(0, state.currentIndex - 1);
      state.verificationCode[state.currentIndex] = "_";
    },
    reset2fa: (state) => {
      state.verificationCode = new Array(6).fill("_");
      state.currentIndex = 0;
    },
    setIsVerifying2Fa: (state, action: SetIsVerifying2FaAction) => {
      state.isVerifying2Fa = action.payload;
    },
    googleLoginSuccess: (state, action: GoogleLoginSuccessAction) => {
      state.sessionInfo = action.payload.sessionInfo;
      state.lastThreePhoneDigits = action.payload.lastThreePhoneDigits;
    },
    sendAuthCode: (state, action: SendAuthCodeAction) => {},
    twoFactorCodeSuccess: (state, action: TwoFactorCodeSuccessAction) => {
      state.tempAccessToken = action.payload.accessToken;
      state.role = action.payload.role;
      state.isVerifying2Fa = false;
    },
    setTempAccessToken: (state, action: SetTempAccessTokenAction) => {
      state.tempAccessToken = action.payload;
    },
    twoFactorCodeError: (state) => {
      state.isVerifying2Fa = false;
    },
  },
});

export { sagas, selectors };
