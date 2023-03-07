import { RootState } from "redux-store";

export const getLoginStatus = (state: RootState) => state.login.loginStep;
export const get2faCode = (state: RootState) => state.login.verificationCode;
export const getCurrentIndex = (state: RootState) => state.login.currentIndex;
export const getIsVerifying2fa = (state: RootState) =>
  state.login.isVerifying2Fa;
export const getTempAccessToken = (state: RootState) =>
  state.login.tempAccessToken;
export const getLastThreePhoneDigits = (state: RootState) =>
  state.login.lastThreePhoneDigits;
export const getSessionInfo = (state: RootState) => state.login.sessionInfo;
export const getRole = (state: RootState) => state.login.role;
