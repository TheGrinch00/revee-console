import { useMemo } from "react";

export const usePositionEdit = () => {
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

  return { dayOfWeek, hourOfDay, minuteOfHour };
};
