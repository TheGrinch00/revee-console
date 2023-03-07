import { useCallback, useEffect, useMemo } from "react";
import { actions, selectors } from "redux-store";
import {
  PersonOutlineOutlined,
  MasksOutlined,
  AssignmentOutlined,
  CardMembershipOutlined,
  LocalOfferOutlined,
  DoneRounded,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";

import { Box, Step, Stepper } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { StepConnector, StepLabel } from "@mui/material";
import {
  VisitCreateGeneralDataInput,
  VisitCreateProductsSelectionStep,
  VisitCreateAgentSelectionStep,
  VisitCreateQontoStepIcon,
  VisitCreateSamplesSelectionStep,
} from "components";
import VisitCreateDoctorSelectionStep from "components/VisitCreateDoctorSelectionStep";
import { useGetAccessToken } from "hooks/useGetAccessToken";

const QontoConnector = withStyles({
  active: {
    "& $line": {
      borderColor: "#2e5bff",
    },
  },
  completed: {
    "& $line": {
      borderColor: "#2e5bff",
    },
  },
  line: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const VisitCreateStepper = (props: any) => {
  const dispatch = useDispatch();
  const { token } = useGetAccessToken();
  const step = useSelector(selectors.getVisitCreateCurrentStep);

  const icons = useMemo(
    () => [
      <PersonOutlineOutlined />,
      <MasksOutlined />,
      <AssignmentOutlined />,
      <LocalOfferOutlined />,
      <CardMembershipOutlined />,
    ],
    []
  );

  useEffect(() => {
    dispatch(actions.fetchProducts({ token }));
  }, [dispatch, token]);

  return (
    <Box style={{ width: "100%" }}>
      <Stepper activeStep={step} connector={<QontoConnector />}>
        {icons.map((icon, index) => {
          return (
            <Step key={index}>
              <StepLabel
                StepIconComponent={() => (
                  <VisitCreateQontoStepIcon
                    icon={icon}
                    doneIcon={<DoneRounded />}
                    completed={step > index}
                    active={step === index}
                  />
                )}
              ></StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {step === 0 && <VisitCreateAgentSelectionStep />}
      {step === 1 && <VisitCreateDoctorSelectionStep />}
      {step === 2 && <VisitCreateGeneralDataInput />}
      {step === 3 && <VisitCreateProductsSelectionStep />}
      {step === 4 && <VisitCreateSamplesSelectionStep />}
    </Box>
  );
};

export const useVisitCreate = () => {
  const { token } = useGetAccessToken();
  const dispatch = useDispatch();

  const onSuccesshHandle = useCallback(
    ({ data }) => {
      dispatch(actions.setIsVisitCreateDialogOpen(false));
      dispatch(actions.postProducts({ token, visitId: data.id }));
      dispatch(actions.postSamples({ token, visitId: data.id }));
      dispatch(actions.setVisitCreateStep(0));
    },
    [dispatch, token]
  );

  const onFailureHandle = useCallback(() => {
    dispatch(actions.setVisitCreateStep(0));
  }, [dispatch]);

  return {
    onFailureHandle,
    onSuccesshHandle,
    VisitCreateStepper,
  };
};
