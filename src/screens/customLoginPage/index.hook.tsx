import "firebase/auth";

import { Theme, useTheme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useCallback, useEffect, useMemo, useRef } from "react";

import { CredentialResponse } from "@react-oauth/google";
import LoginBG from "assets/images/login-bg.jpg";
import { actions } from "redux-store";
import firebase from "firebase/app";
import { selectors } from "redux-store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      padding: "2em",
      backgroundColor: "#eee",
      width: "100vw",
      height: "100vh",
      boxSizing: "border-box",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundImage: `url(${LoginBG})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    },
    imgContainer: {
      marginBottom: "1em",
      "&>*": {
        maxWidth: "300px",
      },
    },
    loginPaper: {
      maxWidth: 500,
      width: 500,
      padding: "2em",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  })
);

export const useCustomLoginPage = () => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const classes = useMemo(() => ({}), []);
  const dispatch = useDispatch();

  const onFailureResponse = useCallback(() => {},
  []);

  const recaptchaDivRef = useRef(null);

  useEffect(() => {
    if (recaptchaDivRef.current) {
      // @ts-ignore
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        recaptchaDivRef.current,
        { size: "invisible" }
      );

      // @ts-ignore
      window.recaptchaVerifier.render();
    }
  }, [recaptchaDivRef]);

  const onSuccessResponse = useCallback(
    async (response: CredentialResponse) => {
      // @ts-ignore
      const recaptchaToken = await window.recaptchaVerifier.verify();

      dispatch(actions.sendGoogleJwt({ recaptchaToken, jwt: response.credential as string }));
    },
    [dispatch]
  );

  const loginState = useSelector(selectors.getLoginStatus);

  return {
    styles,
    classes,
    onSuccessResponse,
    onFailureResponse,
    loginState,
    recaptchaDivRef,
  };
};
