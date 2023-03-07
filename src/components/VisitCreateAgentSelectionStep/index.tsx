import { memo } from "react";
import { useVisitCreateAgentSelectionStep } from "./index.hook";
import { MemberAutocompleteInput, VisitCreateStepContainer } from "components";

const VisitCreateAgentSelectionStep = () => {
  const { choices } = useVisitCreateAgentSelectionStep();

  return (
    <VisitCreateStepContainer stepName="Selezione dell'agente">
      <MemberAutocompleteInput
        id="MemberId"
        name="MemberName"
        surname="MemberSurname"
        label="Agente"
        choices={choices}
      />
    </VisitCreateStepContainer>
  );
};

export default memo(VisitCreateAgentSelectionStep);
