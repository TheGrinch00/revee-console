import { HomeWorkOutlined } from "@mui/icons-material";

import { Create, CreateProps, SimpleForm, TextInput } from "react-admin";

import { useFacilityTypeCreate } from "./index.hook";

export const FacilityTypeCreate = ({ ...props }: CreateProps) => {
  const { styles, onSuccessHandler, onFailureHandler } =
    useFacilityTypeCreate();

  return (
    <div className={styles.positionRelative}>
      <div className={styles.iconAbsolute}>
        <HomeWorkOutlined />
      </div>
      <Create
        {...props}
        onFailure={onFailureHandler}
        onSuccess={onSuccessHandler}
      >
        <SimpleForm>
          <TextInput
            color="secondary"
            label="Tipologia di struttura"
            variant="outlined"
            source="Type"
            fullWidth
          />
        </SimpleForm>
      </Create>
    </div>
  );
};
