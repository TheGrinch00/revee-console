import {
  Edit,
  EditProps,
  TextInput,
  SimpleForm,
  BooleanInput,
  SelectInput,
} from "react-admin";
import { useSampleEdit } from "./index.hook";

export const SampleEdit = (props: EditProps) => {
  const { choices } = useSampleEdit();

  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput
          color="secondary"
          label="Nome"
          source="name"
          variant="outlined"
        />
        <SelectInput
          choices={choices}
          source="type"
          variant="outlined"
          color="secondary"
          label="Tipo"
        />
        <BooleanInput
          label="Disabilitato"
          source="disabled"
          variant="outlined"
        />
      </SimpleForm>
    </Edit>
  );
};
