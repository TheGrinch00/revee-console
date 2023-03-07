import { Facility } from "models/Facility";
import {memo} from "react";
import { FunctionField } from "react-admin";

interface FullstreetFieldProps {
  label?: string;
  record?: Facility;
}

const FullstreetField = ({ record }: FullstreetFieldProps) => (
  <FunctionField
    render={() =>
      `${record!.Street} ${record!.HouseNumber}, ${record!.PostalCode}, ${
        record!.Division
      }`
    }
  />
);

export default memo(FullstreetField);