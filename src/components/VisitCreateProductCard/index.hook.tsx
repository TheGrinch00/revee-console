import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { actions } from "redux-store";

import { Theme, useTheme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Product } from "models/Product";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      position: "relative",
      aspectRatio: "1/1",
    },
    productImage: {
      height: "100%",
      objectFit: "cover",
    },
    nameLabel: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      padding: 5,
      backgroundColor: theme.palette.secondary.main,
      color: "white",
      textAlign: "center",
    },
    overlayContainer: {
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
    },
    selectedOverlay: {
      position: "relative",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(226, 0, 116, 0.85)",
    },
    doneIcon: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      color: "white",
      "& svg": {
        fontSize: "3rem!important",
      },
    },
  })
);

export const useVisitCreateProductCard = (product: Product) => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const classes = useMemo(() => ({}), []);

  const dispatch = useDispatch();

  const imagesArray = useMemo(
    () => product.attachments?.filter((att) => att.type === "IMG"),
    [product]
  );
  const productImage = useMemo(
    () =>
      (imagesArray ?? [])[0]?.fileUrl ??
      "https://via.placeholder.com/500.webp/FFFFFF/E20074?text=Rev%C3%A9e+S.R.L",
    [imagesArray]
  );

  const onProductCreateClicked = useCallback(() => {
    dispatch(actions.toggleProduct(product.id));
  }, [dispatch, product]);
  
  const onProductEditClicked = useCallback(() => {
    dispatch(actions.toggleUpdatedProduct(product.id));
  }, [dispatch, product]);

  return {
    styles,
    classes,
    onProductCreateClicked,
    onProductEditClicked,
    productImage
  };
};
