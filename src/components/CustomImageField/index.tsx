import { memo } from "react";
import defaultProfilePicture from "assets/images/defaultProfileImage.jpg";
import { useCustomImageField } from "./index.hook";

interface CustomImageFieldProps {
  source: string;
}

export const CustomImageField = ({ source }: CustomImageFieldProps) => {
  const { record, styles } = useCustomImageField();
  const url = record[source];

  return (
    <img
      src={url ?? defaultProfilePicture}
      alt="Immagine di profilo"
      className={styles.image}
    />
  );
};

export default memo(CustomImageField);
