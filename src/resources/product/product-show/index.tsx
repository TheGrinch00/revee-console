import {  Grid, Typography } from "@material-ui/core";
import {
  FileShow,
  ImageShow,
  useProductShow,
  ProductTitle,
} from "./index.hook";
import {
  Show,
  TextField,
  ShowProps,
  ReferenceField,
  SimpleShowLayout,
  ChipField,
} from "react-admin";

export const ProductShow = (props: ShowProps) => {
  const { styles } = useProductShow(props);

  return (
    <Show title={<ProductTitle />} {...props}>
      <SimpleShowLayout className={styles.mainContainer}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignContent="center"
          spacing={3}
        >
          <Grid
            container
            direction="column"
            item
            xs={6}
            sm={6}
            md={6}
            spacing={3}
            justifyContent="center"
          >
            <Grid item>
              <Typography className={styles.label}>Prodotto</Typography>
              <TextField label="Nome" source="ProductName" color="secondary" />
            </Grid>
            <Grid item>
              <Typography className={styles.label}>Categoria</Typography>
              <ReferenceField
                label="Categoria"
                source="productCategoryId"
                reference="ProductCategories"
              >
                <ChipField
                  source="name"
                  style={{ color: "white", backgroundColor: "#a9a9a9" }}
                />
              </ReferenceField>
            </Grid>
            
          </Grid>

          <Grid
            container
            direction="column"
            item
            xs={6}
            sm={6}
            md={6}
            alignItems="center"
          >
            <Grid item>
              <ImageShow />
            </Grid>
          </Grid>
          <Grid container item  direction="column" xs={12} sm={12} md={12}justifyContent="center">
              <Grid item >
                <Typography className={styles.label} style={{marginLeft: "25px"}}>Allegati</Typography>
                <FileShow />
              </Grid>
          </Grid>
        </Grid>
      </SimpleShowLayout>
    </Show>
  );
};
