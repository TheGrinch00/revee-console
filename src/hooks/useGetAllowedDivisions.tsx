import { useEffect, useMemo } from "react";
import { useGetManyReference, useRecordContext } from "react-admin";

import { actions } from "../redux-store";
import { useDispatch } from "react-redux";

export const useGetAllowedDivisions = () => {
  const dispatch = useDispatch();
  const record = useRecordContext();

  const { data: allowedDivisions, ids: allowedDivisionsIds } =
    useGetManyReference(
      "allowedDivisions",
      "MemberId",
      record.id,
      { page: 1, perPage: 120 },
      { field: "id", order: "DESC" },
      {},
      "Members"
    );

  const selectedProvinceShortNames: string[] = useMemo(() => {
    return (allowedDivisionsIds as string[]).map(
      (id: string) => allowedDivisions[id].division
    );
  }, [allowedDivisions, allowedDivisionsIds]);

  useEffect(() => {
    dispatch(actions.setSelectedProvinces(selectedProvinceShortNames));
  }, [dispatch, selectedProvinceShortNames]);
};
