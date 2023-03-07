import { useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { actions, selectors } from "../../../redux-store";
import { useDropzone } from "react-dropzone";
import { Button, Card, Typography, Theme, useTheme } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useGetAccessToken } from "hooks/useGetAccessToken";

const useStyles = makeStyles((theme: Theme) => ({
  mainContainer: { width: "100%" },
  card: {
    border: "1px solid",
    borderColor: "#a9a9a9",
    backgroundColor: "#a9a9a9",
    color: "#a9a9a9",
    boxShadow: "10px 10px 5px #a9a9a9 inset",
    width: "100%",
    marginBottom: "25px",
    marginTop: "0px",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "15px",
    boxSizing: "border-box",
  },
  attachment: {
    color: "#241D2D",
    textColor: "#241D2D",
    backgroundColor: "#241D2D",
  },
}));

export const ImageInput = () => {
  const theme = useTheme();
  const styles = useStyles(theme);

  const dispatch = useDispatch();
  const productAttachments = useSelector(selectors.getProductAttachments);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (files) => {
      files.forEach((file) => {
        dispatch(actions.addAttachment(file));
      });
    },
    accept: "image/jpeg, image/png",
  });

  return (
    <Card {...getRootProps()} className={styles.card}>
      <input {...getInputProps()} />
      {productAttachments.filter((file) => !file.path.match(/.*pdf$/i))
        .length <= 0 ? (
        <Typography>Drag and Drop le immagini del prodotto qui!</Typography>
      ) : null}
      {productAttachments
        .filter((file) => !file.path.match(/.*pdf$/i))
        .map((file: File) => {
          return (
            <Button
              variant="text"
              color="primary"
              onClick={() => dispatch(actions.removeAttachment(file))}
              startIcon={<RemoveCircleIcon />}
              key={file.name}
              className={styles.attachment}
            >
              {file.name}
            </Button>
          );
        })}
    </Card>
  );
};

export const FileInput = () => {
  const theme = useTheme();
  const styles = useStyles(theme);

  const dispatch = useDispatch();
  const productAttachments = useSelector(selectors.getProductAttachments);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (files) => {
      files.forEach((file) => {
        dispatch(actions.addAttachment(file));
      });
    },
    accept: "application/pdf",
  });

  return (
    <Card {...getRootProps()} className={styles.card}>
      <input {...getInputProps()} />
      {productAttachments.filter((file) => file.path.match(/.*pdf$/i)).length <=
      0 ? (
        <Typography>Drag and Drop i file del prodotto qui!</Typography>
      ) : null}
      {productAttachments
        .filter((file) => file.path.match(/.*pdf$/i))
        .map((file: File) => {
          return (
            <Button
              variant="text"
              color="primary"
              onClick={() => dispatch(actions.removeAttachment(file))}
              startIcon={<RemoveCircleIcon />}
              key={file.name}
              className={styles.attachment}
            >
              {file.name}
            </Button>
          );
        })}
    </Card>
  );
};

export const useProductCreate = () => {
  const dispatch = useDispatch();
  const { token } = useGetAccessToken();

  const onSuccesshHandle = useCallback(
    ({ data }) => {
      dispatch(actions.uploadAttachments({ token, attachment_ID: data.id }));
      dispatch(actions.setIsProductCreateDialogOpen(false));
      dispatch(actions.resetAttachments());
    },
    [dispatch, token]
  );

  const style = useStyles();

  return {
    onSuccesshHandle,
    style,
  };
};
