import { memo } from "react";
import { FunctionField } from "react-admin";
interface FullNameFieldProps {
  label?: string;
  nameField: string;
  surnameField: string;
}
const FullNameField = (props: FullNameFieldProps) => (
  <FunctionField
    render={(record: any) =>
      `${record[props.nameField]} ${record[props.surnameField]}`
    }
  />
);

export default memo(FullNameField);