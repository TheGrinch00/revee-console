import { memo } from "react";
import { Button, SaveButton, Toolbar } from "ra-ui-materialui";
import CloseIcon from "@material-ui/icons/Close";

import { useVisitCreateToolbar } from "./index.hook";

const VisitCreateToolbar = (props: any) => {
  const { onClickHandle, step } = useVisitCreateToolbar();
  return (
    <Toolbar {...props}>
      <Button label="Chiudi" onClick={onClickHandle}>
        <CloseIcon />
      </Button>
      {step === 4 ? <SaveButton label="Save" submitOnEnter={true} /> : null}
    </Toolbar>
  );
};

export default memo(VisitCreateToolbar);
