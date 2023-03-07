import { memo } from "react";
import { FunctionField, useRecordContext } from "react-admin";
import moment from "moment";
interface CoolDateFieldProps {
  label?: string;
  source: string;
  record?: any;
  className?: string;
}

const CoolDateFieldShow = ({
  className,
  source,
  label,
}: CoolDateFieldProps) => {
  const record = useRecordContext();
  return (
    <FunctionField
      className={className}
      label={label}
      render={() => {
        if (source && record[source])
          return moment(record[source]).format("ll");
        else return "Nessun Valore Presente";
      }}
    />
  );
};

export default memo(CoolDateFieldShow);