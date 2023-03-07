import { Theme } from "@material-ui/core";

import { makeStyles, useTheme } from "@material-ui/styles";
import { Link, Typography, ListItem, Divider, List } from "@mui/material";
import { useEffect } from "react";
import { ShowProps, useRecordContext } from "react-admin";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "redux-store";
import { useGetAccessToken } from "hooks/useGetAccessToken";

const useStyles = makeStyles((theme: Theme) => ({
  mainContainer: {
    width: "75%",
    marginTop: "15px",
    marginBottom: "15px",
    padding: "10%",
  },
  card: {
    width: "100%",
    height: "auto",
    border: "0px solid",
    boxSizing: "border-box",
    margin: "15%",
    paddingLeft: "5%",
  },
  img: {
    maxWidth: "100%",
    boxSizing: "border-box",
    margin: "auto",
    alignSelf: "center",
    padding: "10%",
    paddingTop: "15%",
  },
  carousel: {
    width: "300px",
    height: "250px",
    alignContent: "center",
    justifyContent: "center",
  },
  label: {
    color: "#a9a9a9",
    fontSize: 11,
  },
  sublabel: {
    color: "#a9a9a9",
    fontSize: 9,
  },
}));
export const useProductShow = (props: ShowProps) => {
  const theme = useTheme();
  const styles = useStyles(theme);

  return { styles };
};
export const ProductTitle = () => {
  const record: any = useRecordContext();
  return (
    <span>Prodotto{record ? `: ${record!.ProductName}` : `${record!.id}`}</span>
  );
};

export const ImageShow = () => {
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

  let images = attachments.filter((att) => att!.type === "IMG");
  return (
    <>
      {images.length > 0 ? (
        <Carousel
          autoPlay={false}
          className={styles.carousel}
          indicators={false}
        >
          {images.map((item, i) => {
            return (
              <img
                key={i}
                src={item.fileUrl}
                className={styles.img}
                alt={item.details}
              />
            );
          })}
        </Carousel>
      ) : null}
    </>
  );
};

export const FileShow = () => {
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

  let files = attachments.filter((att) => att!.type === "DOC");
  if (files.length <= 0)
    return <Typography className={styles.sublabel}>Nessun allegato</Typography>;
  return (
    <List>
      <Divider />
      {files.map((file: any) => {
        return (
          <ListItem divider>
            <Link color="#241D2D" href={file!.fileUrl} underline="always">
              {file!.details}
            </Link>
          </ListItem>
        );
      })}
    </List>
  );
};
