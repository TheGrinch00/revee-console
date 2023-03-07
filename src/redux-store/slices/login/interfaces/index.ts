export enum LoginStep {
  IDLE = "idle",
  TWO_FA = "2fa",
}
export enum Roles {
  ADMIN = "admin",
  MANAGER = "manager",
}
export interface SetLoginStatusAction {
  payload: LoginStep;
}

export interface SendGoogleJwtAction {
  payload: {
    recaptchaToken: string;
    jwt: string;
  };
}

export interface GoogleLoginSuccessAction {
  payload: {
    lastThreePhoneDigits: string;
    sessionInfo: string;
  };
}

export interface SuccessLoopbackGoogleLoginResponse {
  sessionInfo: string;
  phoneNumber: string;
}

export interface SetTempAccessTokenAction {
  payload: string;
}

export interface SetDigitAction {
  payload: {
    value: string;
  };
}

export interface SetIsVerifying2FaAction {
  payload: boolean;
}

export interface SendAuthCodeAction {
  payload: {
    code: string;
    sessionInfo: string;
  };
}

export interface TwoFactorCodeSuccessAction {
  payload: {
    accessToken: string;
    role: Roles;
  };
}

export interface LoginState {
  loginStep: LoginStep;
  verificationCode: string[];
  currentIndex: number;
  isVerifying2Fa: boolean;
  tempAccessToken: string;
  sessionInfo: string;
  lastThreePhoneDigits: string;
  role?: Roles;
}
