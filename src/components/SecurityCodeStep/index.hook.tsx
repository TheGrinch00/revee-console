import { useCallback, useEffect, useState, useMemo } from "react";
import { Theme, useTheme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useLogin, showNotification } from "react-admin";
import { useSelector, useDispatch } from "react-redux";
import { selectors, actions } from "redux-store";

import { useKeyPress } from "hooks/use_key_pressed";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    phoneInfoContainer: {
      display: "flex",
      justifyContent: "center",
      padding: "0 2em",
      "&>*": {
        textAlign: "center",
        fontSize: 15,
        color: "#241D2D",
        "&>span": {
          color: "#E20074",
        },
      },
    },
    sendAgainContainer: {
      display: "flex",
      alignItems: "center",
      "&>*": {
        color: "#241D2D",
        fontSize: 15,
      },
    },
    sendAgainButton: {
      textTransform: "none",
      fontSize: 15,
      fontWeight: "bold",
      letterSpacing: 0,
      "&:hover": {
        background: "none",
        textDecoration: "underline",
      },
    },
  })
);

export const useSecurityCodeStep = () => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const classes = useMemo(() => ({}), []);

  const dispatch = useDispatch();
  const login = useLogin();

  const activeIndex = useSelector(selectors.getCurrentIndex);
  const currentCode = useSelector(selectors.get2faCode);
  const isVerifying2fa = useSelector(selectors.getIsVerifying2fa);
  const tempAccessToken = useSelector(selectors.getTempAccessToken);
  const sessionInfo = useSelector(selectors.getSessionInfo);
  const lastThreePhoneDigits = useSelector(selectors.getLastThreePhoneDigits);

  // State for timer
  const [seconds, setSeconds] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(false);

  // Target only digits from 0 to 9 and internally checks for backspace
  const { isKeyPressed, keyPressed } = useKeyPress(/\d/);

  const resendCode = useCallback(() => {
    dispatch(showNotification("Codice inviato nuovamente", "info"));
    setIsTimerActive(true);
  }, [dispatch]);

  // Store a new digit only if the key pressed matches our pattern and
  // if there is not a verification active
  useEffect(() => {
    if (isKeyPressed && !isVerifying2fa) {
      if (keyPressed === "BACKSPACE") {
        dispatch(actions.deleteLastDigit());
      } else {
        dispatch(actions.updateDigit({ value: keyPressed }));
      }
    }
  }, [isKeyPressed, keyPressed, dispatch, isVerifying2fa]);

  // If the active index is 6, the code is fully entered
  // Start the verification process
  useEffect(() => {
    if (activeIndex === 6 && sessionInfo !== "") {
      const code = currentCode.join("");

      dispatch(actions.setIsVerifying2Fa(true));
      dispatch(actions.sendAuthCode({ code, sessionInfo }));
    }
  }, [dispatch, activeIndex, currentCode, sessionInfo]);

  // If we have a token, means the code was correct
  // so we can actually call the login callback in react-admin
  useEffect(() => {
    if (!tempAccessToken) return;

    login(tempAccessToken);
    dispatch(actions.setTempAccessToken(""));
  }, [tempAccessToken, login, dispatch]);

  // Timer controller
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isTimerActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    }

    if (seconds === 0) {
      setSeconds(60);
      setIsTimerActive(false);
    }

    return () => clearInterval(interval);
  }, [isTimerActive, seconds]);

  return {
    styles,
    classes,
    activeIndex,
    currentCode,
    isVerifying2fa,
    resendCode,
    seconds,
    isTimerActive,
    lastThreePhoneDigits,
  };
};
