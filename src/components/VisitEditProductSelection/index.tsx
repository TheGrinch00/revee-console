import { Grid, Typography } from "@material-ui/core";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material";
import { useVisitEditProductSelection } from "./index.hook";
import { ExpandMore } from "@mui/icons-material";
import { Product } from "../../models/Product";
import { VisitCreateProductCard } from "../../components";

const VisitEditProductSelection = () => {
  const { chosenProducts, productsPerCategory } =
    useVisitEditProductSelection();

  return (
    <Box>
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
                        flag="Edit"
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};
export default VisitEditProductSelection;
