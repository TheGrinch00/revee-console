import {
  Datagrid,
  List,
  ListProps,
  TextField,
  TopToolbar,
  Button,
} from "react-admin";
import { Dialog } from "@mui/material";
import AddIcon from "@material-ui/icons/Add";

import {
  useProductCategoryList,
  useProductCategoryListActions,
} from "./index.hook";

import { ProductCategoryCreate } from "../productCategory-create";
import { ProductCategoryEdit } from "../productCategory-edit";

export const ProductCategoryList = (props: ListProps) => {
  const {
    classes,
    isProductCategoryCreateDialogOpen,
    closeProductCategoryCreateDialog,
    isAdmin,
  } = useProductCategoryList();

  return (
    <>
      <List
        {...props}
        bulkActionButtons={false}
        actions={<ProductCategoryListActions />}
      >
        <Datagrid expand={isAdmin ? <ProductCategoryEdit /> : undefined}>
          <TextField color="secondary" label="Categoria" source="name" />
        </Datagrid>
      </List>

      <Dialog
        classes={classes.dialogClasses}
        open={isProductCategoryCreateDialogOpen}
        onBackdropClick={closeProductCategoryCreateDialog}
        maxWidth="lg"
      >
        <ProductCategoryCreate {...props} />
      </Dialog>
    </>
  );
};

const ProductCategoryListActions = () => {
  const { isAdmin, onProductCategoryCreateButtonPressed } =
    useProductCategoryListActions();

  return isAdmin ? (
    <TopToolbar>
      <Button label="Crea" onClick={onProductCategoryCreateButtonPressed}>
        <AddIcon />
      </Button>
    </TopToolbar>
  ) : (
    <div />
  );
};
