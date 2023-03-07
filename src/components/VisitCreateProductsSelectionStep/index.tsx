import { memo } from "react";
import { Grid, Typography } from "@material-ui/core";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { useVisitCreateProductsSelectionStep } from "./index.hook";
import { ExpandMore } from "@mui/icons-material";
import { Product } from "models/Product";
import { VisitCreateStepContainer, VisitCreateProductCard } from "components";

const VisitCreateProductsSelectionStep = () => {
  const { chosenProducts, productsPerCategory } =
    useVisitCreateProductsSelectionStep();

  return (
    <VisitCreateStepContainer stepName="Prodotti di interesse">
      {productsPerCategory.map((cat) => {
        return (
          <Accordion key={cat.name}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography>{cat.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container direction="row" spacing={2}>
                {cat.products.map((prod: Product) => {
                  const isSelected = chosenProducts.includes(prod.id);

                  return (
                    <Grid
                      item
                      xl={2}
                      lg={2}
                      md={3}
                      sm={4}
                      xs={6}
                      key={prod.id}
                      direction="column"
                      alignItems="center"
                    >
                      <VisitCreateProductCard
                        product={prod}
                        selected={isSelected}
                        flag="Create"
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </VisitCreateStepContainer>
  );
};

export default memo(VisitCreateProductsSelectionStep);
