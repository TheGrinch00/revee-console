import { makeStyles } from "@material-ui/styles";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import {
  Box,
  Button,
  Card,
  Chip,
  Grid,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import { useCallback, useEffect } from "react";
import { useRecordContext, useRedirect } from "react-admin";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "redux-store";
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
  label: {
    color: "#241D2D",
    textSizeAdjust: "2px",
    fontSize: "1.2rem",
    paddingLeft: "10px",
  },
  sublabel: {
    color: "#a9a9a9",
    fontSize: 9,
  },
  chip: {
    padding: "25px",
    margin: "20px",
  },
}));

export const AttachmentShow = () => {
  const theme = useTheme();
  const styles = useStyles(theme);

  const { token } = useGetAccessToken();
  const attachments = useSelector(selectors.getAttachments);

  const record = useRecordContext();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      actions.fetchAttachments({
        productId: record!.id as number,
        token,
      })
    );
  }, [record, dispatch, token]);

  const onClickHandle = useCallback(
    (attachmentId: number) => {
      dispatch(
        actions.removeProductAttachment({
          token,
          productId: record!.id as number,
          attachmentId: attachmentId,
        })
      );
      dispatch(
        actions.fetchAttachments({
          productId: record!.id as number,
          token,
        })
      );
    },
    [dispatch, record, token]
  );

  return (
    <Box>
      <Typography className={styles.label}>Allegati</Typography>
      {attachments.length > 0 ? (
        <Grid container spacing={1}>
          {attachments.map((item, key) => {
            return (
              <Grid item>
                <Chip
                  onDelete={() => onClickHandle(item!.id!)}
                  label={item.details}
                  className={styles.chip}
                />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Typography className={styles.sublabel}>Nessun allegato</Typography>
      )}
    </Box>
  );
};

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
            >
              {file.name}
            </Button>
          );
        })}
    </Card>
  );
};
export const useProductEdit = () => {
  const dispatch = useDispatch();
  const redirect = useRedirect();
  const { token } = useGetAccessToken();
  const productAttachments = useSelector(selectors.getProductAttachments);

  const onSuccesshHandle = useCallback(
    ({ data }) => {
      if (productAttachments.length > 0) {
        dispatch(actions.uploadAttachments({ token, attachment_ID: data.id }));
        dispatch(actions.resetAttachments());
      }
      redirect("/Products");
    },
    [dispatch, redirect, token, productAttachments]
  );

  const onFailureHandle = useCallback(() => {
    redirect("/Products");
  }, [redirect]);
  const style = useStyles();

  return {
    onSuccesshHandle,
    onFailureHandle,
    style,
  };
};
