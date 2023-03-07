import { useSelector } from "react-redux";
import { selectors } from "redux-store";

export const useVisitCreateProductsSelectionStep = () => {
  const productsPerCategory = useSelector(selectors.getProductsPerCategory);
  const chosenProducts = useSelector(selectors.getVisitProducts);

  return {
    productsPerCategory,
    chosenProducts,
  };
};
