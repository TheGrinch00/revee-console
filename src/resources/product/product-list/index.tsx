import {
  List,
  Datagrid,
  ListProps,
  TextField,
  TopToolbar,
  Button,
  ReferenceField,
  TextInput,
  EditButton,
  ChipField,
  ShowButton,
  BulkDeleteButton,
} from "react-admin";

import { useDispatch } from "react-redux";

import { Fragment, useCallback } from "react";
import { Dialog } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { useProductList } from "./index.hook";
import { ProductCreate } from "..";
import { actions } from "redux-store";
import { useIsAdmin } from "hooks/useIsAdmin";

const ProductBulkActionButtons = (props: any) => (
  <Fragment>
    <BulkDeleteButton {...props} />
  </Fragment>
);
const ProductFilters = [
  <ReferenceField source="productCategoryId" reference="ProductCategories">
    <TextInput variant="outlined" label="Categoria" source="name" />
  </ReferenceField>,
  <TextInput variant="outlined" label="Nome" source="ProductName" />,
];

const ProductListActions = () => {
  const dispatch = useDispatch();
  const onClick = useCallback(() => {
    dispatch(actions.setIsProductCreateDialogOpen(true));
  }, [dispatch]);

  const isAdmin = useIsAdmin();

  return isAdmin ? (
    <TopToolbar>
      <Button label="Crea" onClick={onClick}>
        <AddIcon />
      </Button>
    </TopToolbar>
  ) : (
    <div />
  );
};

export const ProductList = (props: ListProps) => {
  const { isCreateDialogOpen, isAdmin } = useProductList();

  return (
    <>
      <List
        {...props}
        actions={<ProductListActions />}
        filters={ProductFilters}
        bulkActionButtons={<ProductBulkActionButtons />}
      >
        <Datagrid>
          <TextField color="secondary" source="ProductName" label="Nome" />
          <ReferenceField
            label="Categoria"
            source="productCategoryId"
            reference="ProductCategories"
            linkType={false}
          >
            <ChipField source="name" style={{ backgroundColor: "#E8E8E8" }} />
          </ReferenceField>
          <ShowButton label="Mostra" variant="text" color="secondary" />
          {isAdmin && (
            <EditButton label="Modifica" variant="text" color="secondary" />
          )}
        </Datagrid>
      </List>

      <Dialog open={isCreateDialogOpen} fullWidth maxWidth="lg">
        <ProductCreate {...props} />
      </Dialog>
    </>
  );
};
