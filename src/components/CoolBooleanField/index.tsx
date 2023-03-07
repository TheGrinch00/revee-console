import React, { memo } from "react";
import { FunctionField, useRecordContext } from "react-admin";
import { useCoolBooleanField } from "./index.hook";
interface CoolBooleanFieldProps {
  label?: string;
  source: string;
  callback: (data: 0 | 1) => string;
  record?: any;
}
const CoolBooleanField = ({
  source,
  label,
  callback,
}: CoolBooleanFieldProps) => {
  const { styles } = useCoolBooleanField();
  const record = useRecordContext();
  const value = callback(record[source]);
  return (
    <FunctionField
      className={record[source] ? styles.false : styles.true}
      label={label}
      render={() => value}
    />
  );
};

export default memo(CoolBooleanField);
