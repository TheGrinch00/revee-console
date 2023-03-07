import { useEffect, useMemo, useState, useCallback } from "react";
import { useGetList } from "react-admin";
import { useFormState, useForm } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { selectors, actions } from "redux-store";
import { useGetAccessToken } from "hooks/useGetAccessToken";
import { Employee } from "models/Employee";
import { Position } from "models/Position";
import { Theme, useTheme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fullWidth: { width: "100%" },
    inputBgWhite: {
      "&>*:not(:last-child):not(:first-child)": {
        backgroundColor: "white!important",
      },
    },
  })
);

export const useVisitCreateDoctorSelectionStep = () => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const classes = useMemo(() => ({}), []);

  const dispatch = useDispatch();
  const { token } = useGetAccessToken();
  const { values } = useFormState();
  const { change } = useForm();

  const [currentEmployeeId, setCurrentEmployeeId] = useState<number | null>();

  // fetch doctors
  const { data: doctorsData } = useGetList<Employee>("Employees");
  const availableDoctors = useMemo(
    () => Object.values(doctorsData),
    [doctorsData]
  );

  // fetch positions
  const doctorIds = useMemo(
    () => availableDoctors.map((doc) => doc.id),
    [availableDoctors]
  );
  const { data: positionsData } = useGetList<Position>(
    "Positions",
    undefined,
    undefined,
    { EmployeeId: { inq: doctorIds } }
  );
  const allowedDoctors = useMemo(
    () =>
      availableDoctors.filter((doc) =>
        Object.values(positionsData).some((pos) => pos.EmployeeId === doc.id)
      ),
    [positionsData, availableDoctors]
  );

  const positions = useSelector(selectors.getPositions);

  const inputText = useCallback(
    (choice: any) => `${choice.ward} ${choice.facility}`,
    []
  );

  useEffect(() => {
    if (values.EmployeeId)
      dispatch(
        actions.fetchPositions({
          token,
          positionId: values.EmployeeId,
        })
      );
  }, [dispatch, token, values.EmployeeId]);

  // When the user changes Doctor, the position gets reset
  useEffect(() => {
    values as { PositionId: number; EmployeeId: number };

    if (values.EmployeeId !== currentEmployeeId) {
      setCurrentEmployeeId(values.EmployeeId);
      change("PositionId", undefined);
    }

    console.table(values);
  }, [currentEmployeeId, values, change]);

  return { styles, classes, allowedDoctors, positions, inputText };
};
