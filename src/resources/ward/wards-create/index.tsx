import { BloodtypeOutlined } from "@mui/icons-material";

import { Create, CreateProps, SimpleForm, TextInput } from "react-admin";

import { useWardCreate } from "./index.hook";

export const WardCreate = ({ ...props }: CreateProps) => {
  const { styles, onSuccessHandler, onFailureHandler } = useWardCreate();

  return (
    <div className={styles.positionRelative}>
      <div className={styles.iconAbsolute}>
        <BloodtypeOutlined />
      </div>
      <Create
        {...props}
        onFailure={onFailureHandler}
        onSuccess={onSuccessHandler}
      >
        <SimpleForm>
          <TextInput
            color="secondary"
            label="Reparto"
            variant="outlined"
            source="Ward"
            fullWidth
          />
        </SimpleForm>
      </Create>
    </div>
  );
};
