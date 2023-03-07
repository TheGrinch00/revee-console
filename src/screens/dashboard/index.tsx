import { Divider, Grid, Card, Typography } from "@mui/material";
import { EmployeePerCategory } from "./employeePerCategory";
import { EmployeePerDivision } from "./employeePerDivision";
import { useGeneralStatistic } from "./index.hook";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actions } from "redux-store";

export const Dashboard = () => {
    const dispatch = useDispatch();
    const { styles } = useGeneralStatistic();
  useEffect(() => {
    let lbtoken = localStorage.getItem("lbtoken");
    lbtoken = lbtoken!.substr(1, lbtoken!.length - 2);
    dispatch(
      actions.fetchStatistics({ token: lbtoken, general: true, id: "me" })
    );
  }, [dispatch]);

  return (
    <Card className={styles.mainContainer}>
      <Grid container alignContent="center" justifyContent="center" spacing={1}>
        <Grid
          item
          container
          alignContent="center"
          justifyContent="center"
          xs={12}
          sm={12}
          md={12}
        >
          <Typography variant="h1" fontWeight={900} fontSize={25}>
            Medici per Provincia
          </Typography>
        </Grid>
        <Grid
          item
          container
          alignContent="center"
          justifyContent="center"
          xs={6}
          sm={6}
          md={6}
        >
          <EmployeePerDivision />
        </Grid>
        <Divider className={styles.divider} />
        <Grid
          item
          container
          alignContent="center"
          justifyContent="center"
          xs={12}
          sm={12}
          md={12}
        >
          <Typography variant="h1" fontWeight={900} fontSize={25}>
            Medici per Categoria
          </Typography>
        </Grid>
        <Grid
          item
          container
          alignContent="center"
          justifyContent="center"
          xs={6}
          sm={6}
          md={6}
        >
          <EmployeePerCategory />
        </Grid>
      </Grid>
    </Card>
  );
};
