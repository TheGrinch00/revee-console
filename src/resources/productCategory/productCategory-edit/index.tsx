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
import { useProductCategoryEdit } from "./index.hook";

export const ProductCategoryEdit = ({ options, ...props }: EditProps) => {
  const { onSuccessHandler, onFailureHandler } = useProductCategoryEdit();

  return (
    <Edit
      {...props}
      onFailure={onFailureHandler}
      onSuccess={onSuccessHandler}
      mutationMode="pessimistic"
    >
      <SimpleForm variant="outlined" toolbar={<ProductCategoryEditToolbar />}>
        <TextInput
          color="secondary"
          label="Categoria"
          source="name"
          validate={required("Devi inserire un nome valido")}
        />
      </SimpleForm>
    </Edit>
  );
};

const ProductCategoryEditToolbar = ({ ...props }: ToolbarProps) => {
  return (
    <Toolbar {...props}>
      <SaveButton />
    </Toolbar>
  );
};
