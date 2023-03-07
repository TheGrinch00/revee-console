import { WorkOutlineRounded } from "@mui/icons-material";

import { Create, CreateProps, SimpleForm, TextInput } from "react-admin";

import { useEmploymentCreate } from "./index.hook";

export const EmploymentCreate = ({ ...props }: CreateProps) => {
  const { styles, onSuccessHandler, onFailureHandler } = useEmploymentCreate();

  return (
    <div className={styles.positionRelative}>
      <div className={styles.iconAbsolute}>
        <WorkOutlineRounded />
      </div>
      <Create
        {...props}
        onFailure={onFailureHandler}
        onSuccess={onSuccessHandler}
      >
        <SimpleForm>
          <TextInput
            color="secondary"
            label="Nome impiego"
            variant="outlined"
            source="Employment"
            fullWidth
          />
        </SimpleForm>
      </Create>
    </div>
  );
};
