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
import { useFacilityTypeEdit } from "./index.hook";

export const FacilityTypeEdit = ({ options, ...props }: EditProps) => {
  const { onSuccessHandler, onFailureHandler } = useFacilityTypeEdit();

  return (
    <Edit
      {...props}
      onFailure={onFailureHandler}
      onSuccess={onSuccessHandler}
      mutationMode="pessimistic"
    >
      <SimpleForm variant="outlined" toolbar={<FacilityTypeEditToolbar />}>
        <TextInput
          color="secondary"
          label="Nome tipologia"
          source="Type"
          validate={required("Devi inserire un nome valido")}
        />
      </SimpleForm>
    </Edit>
  );
};

const FacilityTypeEditToolbar = ({ ...props }: ToolbarProps) => {
  return (
    <Toolbar {...props}>
      <SaveButton />
    </Toolbar>
  );
};
