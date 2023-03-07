import { Create, SimpleForm } from "react-admin";
import { useVisitCreate } from "./index.hook";
import { VisitCreateToolbar, VisitCreateStepperActions } from "components";
import { Box } from "@mui/material";

export const VisitCreate = (props: any) => {
  const { onFailureHandle, onSuccesshHandle, VisitCreateStepper } =
    useVisitCreate();

  return (
    <Create
      {...props}
      onSuccess={onSuccesshHandle}
      onFailure={onFailureHandle}
      title="Crea nuova visita"
    >
      <SimpleForm toolbar={<VisitCreateToolbar />}>
        <Box sx={{ width: "100%" }}>
          <VisitCreateStepper />
          <VisitCreateStepperActions />
        </Box>
      </SimpleForm>
    </Create>
  );
};
