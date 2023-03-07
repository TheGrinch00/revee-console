import {  BookmarkOutlined} from "@mui/icons-material";

import { Create, CreateProps, SimpleForm, TextInput } from "react-admin";

import { useProductCategoryCreate } from "./index.hook";

export const ProductCategoryCreate = ({ ...props }: CreateProps) => {
  const { styles, onSuccessHandler, onFailureHandler } = useProductCategoryCreate();

  return (
    <div className={styles.positionRelative}>
      <div className={styles.iconAbsolute}>
        <BookmarkOutlined />
      </div>
      <Create
        {...props}
        onFailure={onFailureHandler}
        onSuccess={onSuccessHandler}
      >
        <SimpleForm>
          <TextInput
            color="secondary"
            label="Categoria"
            variant="outlined"
            source="name"
            fullWidth
          />
        </SimpleForm>
      </Create>
    </div>
  );
};
