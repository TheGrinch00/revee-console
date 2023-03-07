import { actions } from "../../../redux-store";
import { useProductCreate, ImageInput, FileInput } from "./index.hook";
import { useDispatch } from "react-redux";

import {
  Create,
  SimpleForm,
  TextInput,
  Toolbar,
  SaveButton,
  Button,
  SelectInput,
  ReferenceInput
} from "react-admin";

import { useCallback } from "react";
import CloseIcon from "@material-ui/icons/Close";
import { Grid } from "@material-ui/core";

const ProductCreateToolbar = (props: any) => {
  const dispatch = useDispatch();
  const onClickHandle = useCallback(() => {
    dispatch(actions.setIsProductCreateDialogOpen(false));
  }, [dispatch]);
  return (
    <Toolbar {...props}>
      <SaveButton label="Save" submitOnEnter={true}/>
      <Button label="Chiudi" onClick={onClickHandle}> 
        <CloseIcon/>
      </Button>
    </Toolbar>
  );
};

export const ProductCreate = (props: any) => {
  const { onSuccesshHandle, style } = useProductCreate();

  return (
    <Create {...props} onSuccess={onSuccesshHandle}>
      <SimpleForm toolbar={<ProductCreateToolbar />} className={style.mainContainer}>
        <Grid container direction="column" className={style.mainContainer}>
          <Grid item  xs={11} sm={11} md={11}>
            <TextInput fullWidth label="Nome" source="ProductName" variant="outlined" />
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
             <ImageInput />
          </Grid>
          <Grid item xs={11} sm={11} md={11}>
            <FileInput />
          </Grid>
          
        </Grid>
      </SimpleForm>
    </Create>
  );
};
