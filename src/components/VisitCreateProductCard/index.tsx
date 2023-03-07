import { memo } from "react";
import { useVisitCreateProductCard } from "./index.hook";
import { Product } from "models/Product";
import { Card, Typography } from "@mui/material";
import { CheckCircleOutlineRounded } from "@mui/icons-material";

interface VisitCreateProductCardProps {
  product: Product;
  selected: boolean;
  flag?: string;
}

const VisitCreateProductCard = ({
  product,
  selected,
  flag,
}: VisitCreateProductCardProps) => {
  const { styles, onProductCreateClicked, onProductEditClicked, productImage } =
    useVisitCreateProductCard(product);

  return (
    <Card className={styles.mainContainer} onClick={ flag === "Create" ? onProductCreateClicked : onProductEditClicked}>
      <img
        src={productImage} 
        alt={product.ProductName}
        className={styles.productImage}
      />
      {selected && (
        <div className={styles.overlayContainer}>
          <div className={styles.selectedOverlay}>
            <div className={styles.doneIcon}>
              <CheckCircleOutlineRounded />
            </div>
          </div>
        </div>
      )}
      <Typography className={styles.nameLabel}>
        {product.ProductName}
      </Typography>
    </Card>
  );
};

export default memo(VisitCreateProductCard);
