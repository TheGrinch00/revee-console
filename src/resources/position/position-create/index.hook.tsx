import { useCallback, useMemo } from "react";

import { actions } from "redux-store";

import { useDispatch } from "react-redux";
import { Button, SaveButton, Toolbar } from "react-admin";
import CloseIcon from "@material-ui/icons/Close";
const PositionsCreateToolbar = (props: any) => {
  const dispatch = useDispatch();
  const onClickHandle = useCallback(() => {
    dispatch(actions.setIsPositionCreateDialogOpen(false));
  }, [dispatch]);
  return (
    <Toolbar {...props}>
      <SaveButton label="Save" submitOnEnter={true} />
      <Button label="Chiudi" onClick={onClickHandle}>
        <CloseIcon />
      </Button>
    </Toolbar>
  );
};
export const usePositionCreate = () => {
  const dayOfWeek = useMemo(
    () => [
      { _id: "0", day: "Lunedì" },
      { _id: "1", day: "Martedì" },
      { _id: "2", day: "Mercoledì" },
      { _id: "3", day: "Giovedì" },
      { _id: "4", day: "Venerdì" },
      { _id: "5", day: "Sabato" },
      { _id: "6", day: "Domenica" },
    ],
    []
  );

  const hourOfDay = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 24; i++) arr.push({ _id: "" + i, hour: "" + i });
    return arr;
  }, []);
  const minuteOfHour = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 60; i++) arr.push({ _id: "" + i, minute: "" + i });
    return arr;
  }, []);

  const dispatch = useDispatch();
  const onSuccesshHandle = useCallback(() => {
    dispatch(actions.setIsPositionCreateDialogOpen(false));
  }, [dispatch]);

  return {
    onSuccesshHandle,
    PositionsCreateToolbar,
    dayOfWeek,
    hourOfDay,
    minuteOfHour,
  };
};
