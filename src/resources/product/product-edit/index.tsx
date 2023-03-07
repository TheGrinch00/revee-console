import { Grid, Typography } from "@mui/material";
import {
  useProductEdit,
  ImageInput,
  FileInput,
  AttachmentShow,
} from "./index.hook";
import {
  Edit,
  EditProps,
  TextInput,
  SimpleForm,
  ReferenceInput,
  SelectInput,
  Button,
  SaveButton,
  Toolbar,
  useRedirect,
} from "react-admin";
import { useCallback } from "react";
import { actions } from "redux-store";
import { useDispatch } from "react-redux";

import CloseIcon from "@material-ui/icons/Close";

const ProductEditToolbar = (props: any) => {
  const dispatch = useDispatch();
  const redirect = useRedirect();

  const onClickHandle = useCallback(() => {
    dispatch(actions.resetAttachments());
    redirect("/Products");
  }, [dispatch, redirect]);
  return (
    <Toolbar {...props}>
      <SaveButton label="Save" submitOnEnter={true} />
      <Button label="Chiudi" onClick={onClickHandle}>
        <CloseIcon />
      </Button>
    </Toolbar>
  );
};

export const ProductEdit = (props: EditProps) => {
  const { onSuccesshHandle, onFailureHandle, style } = useProductEdit();
  return (
    <Edit
      {...props}
      onSuccess={onSuccesshHandle}
      onFailure={onFailureHandle}
      mutationMode="pessimistic"
    >
      <SimpleForm toolbar={<ProductEditToolbar />}>
        <Grid
          container
          direction="column"
          spacing={2}
          className={style.mainContainer}
        >
          <Grid item xs={11} sm={11} md={11}>
            <TextInput
              fullWidth
              label="Nome"
              source="ProductName"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={11} sm={11} md={11}>
            <ReferenceInput
              label="Categoria"
              source="productCategoryId"
              reference="ProductCategories"
              variant="outlined"
            >
              <SelectInput fullWidth optionText="name" />
            </ReferenceInput>
          </Grid>
          <Grid item xs={11} sm={11} md={11}>
            <AttachmentShow />
          </Grid>
          <Grid item xs={11} sm={11} md={11}>
            <Typography className={style.label}>Nuovi allegati</Typography>
            <ImageInput />
            <FileInput />
          </Grid>
        </Grid>
      </SimpleForm>
    </Edit>
  );
};
