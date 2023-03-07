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
import { useWardEdit } from "./index.hook";

export const WardEdit = ({ options, ...props }: EditProps) => {
  const { onSuccessHandler, onFailureHandler } = useWardEdit();

  return (
    <Edit
      {...props}
      onFailure={onFailureHandler}
      onSuccess={onSuccessHandler}
      mutationMode="pessimistic"
    >
      <SimpleForm variant="outlined" toolbar={<WardEditToolbar />}>
        <TextInput
          color="secondary"
          label="Reparto"
          source="Ward"
          validate={required("Devi inserire un nome valido")}
        />
      </SimpleForm>
    </Edit>
  );
};

const WardEditToolbar = ({ ...props }: ToolbarProps) => {
  return (
    <Toolbar {...props}>
      <SaveButton />
    </Toolbar>
  );
};
