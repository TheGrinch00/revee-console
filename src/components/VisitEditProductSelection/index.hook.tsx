import { useSelector } from "react-redux";
import { selectors } from "../../redux-store";

export const useVisitEditProductSelection = () => {
  const productsPerCategory = useSelector(selectors.getProductsPerCategory);
  const chosenProducts = useSelector(selectors.getUpdatedProducts);

  return {
    productsPerCategory,
    chosenProducts,
  };
};
