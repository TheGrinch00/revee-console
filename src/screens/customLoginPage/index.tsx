import {GoogleLogin, useGoogleOneTapLogin} from  "@react-oauth/google"

import { LoginComponent } from "ra-core";
import LoginLogo from "assets/images/login-logo.png";
import { Notification } from "react-admin";
import { Paper } from "@material-ui/core";
import { SecurityCodeStep } from "components";
import { useCustomLoginPage } from "./index.hook";

const MyLoginPage: LoginComponent = (props) => {
  const {
    styles,
    onFailureResponse,
    onSuccessResponse,
    loginState,
    recaptchaDivRef,
  } = useCustomLoginPage();

useGoogleOneTapLogin({
  onSuccess: onSuccessResponse,
  onError: onFailureResponse,
});

  return (
    <div className={styles.mainContainer}>
      <Paper className={styles.loginPaper}>
        <div className={styles.imgContainer}>
          <img src={LoginLogo} alt="Revée" />
        </div>
        {loginState === "idle" ? (
          <GoogleLogin
            onSuccess={onSuccessResponse}
            onError={onFailureResponse}
            auto_select
          />
        ) : (
          <SecurityCodeStep />
        )}
      </Paper>
      <Notification />
      <div ref={recaptchaDivRef} id="recaptcha" />
    </div>
  );
};

export default MyLoginPage;
