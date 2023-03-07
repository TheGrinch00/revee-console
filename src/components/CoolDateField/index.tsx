import { memo } from "react";
import { FunctionField, useRecordContext } from "react-admin";
import moment from "moment";
interface CoolDateFieldProps {
  label?: string;
  source?: string;
  record?: any;
  emptyLabel?: string;
}
const CoolDateField = ({
  source,
  emptyLabel = "Data non disponibile",
}: CoolDateFieldProps) => {
  const record = useRecordContext();
  return (
    <FunctionField
      render={() => {
        if (source && record[source])
          return moment(record[source]).format("lll");
        else return emptyLabel;
      }}
    />
  );
};

export default memo(CoolDateField);
