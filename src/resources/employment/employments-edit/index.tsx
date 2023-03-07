import {
  Edit,
  EditProps,
  SimpleForm,
  TextInput,
  required,
  Toolbar,
  SaveButton,
  ToolbarProps,
} from "react-admin";
import { useEmploymentEdit } from "./index.hook";

export const EmploymentEdit = ({ options, ...props }: EditProps) => {
  const { onSuccessHandler, onFailureHandler } = useEmploymentEdit();

  return (
    <Edit
      {...props}
      onFailure={onFailureHandler}
      onSuccess={onSuccessHandler}
      mutationMode="pessimistic"
    >
      <SimpleForm variant="outlined" toolbar={<EmploymentEditToolbar />}>
        <TextInput
          label="Nome impiego"
          source="Employment"
          color="secondary"
          validate={required("Devi inserire un nome valido")}
        />
      </SimpleForm>
    </Edit>
  );
};

const EmploymentEditToolbar = ({ ...props }: ToolbarProps) => {
  return (
    <Toolbar {...props}>
      <SaveButton />
    </Toolbar>
  );
};
