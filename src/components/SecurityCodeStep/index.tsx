import { Typography, Grid, Button } from "@material-ui/core";
import { useSecurityCodeStep } from "./index.hook";
import { DigitInput } from "components";
import { memo } from "react";

const SecurityCodeStep = () => {
  const {
    currentCode,
    styles,
    isVerifying2fa,
    resendCode,
    seconds,
    isTimerActive,
    activeIndex,
    lastThreePhoneDigits,
  } = useSecurityCodeStep();

  return (
    <Grid container alignItems="center" direction="column" spacing={3}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <div className={styles.phoneInfoContainer}>
          <Typography color="primary" variant="h6">
            Al fine di mantenere il tuo account sicuro, è stato inviato un
            codice di verifica al numero{" "}
            <span>*******{lastThreePhoneDigits}</span>
          </Typography>
        </div>
      </Grid>
      <Grid container item spacing={3}>
        {currentCode.map((value, index) => {
          return (
            <Grid key={index} item xs={2} sm={2} md={2} lg={2} xl={2}>
              <DigitInput
                value={value}
                isSelected={activeIndex === index}
                disabled={isVerifying2fa}
              />
            </Grid>
          );
        })}
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <div className={styles.sendAgainContainer}>
          <Typography color="primary" variant="h6">
            Non hai ricevuto il codice?
            <Button
              variant="text"
              size="small"
              className={styles.sendAgainButton}
              onClick={resendCode}
              disabled={isVerifying2fa || isTimerActive}
            >
              Invia di nuovo
            </Button>
          </Typography>
          {isTimerActive && <Typography>({seconds})</Typography>}
        </div>
      </Grid>
    </Grid>
  );
};

export default memo(SecurityCodeStep);