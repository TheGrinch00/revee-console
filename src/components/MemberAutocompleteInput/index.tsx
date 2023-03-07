import { memo } from "react";
import { AutocompleteInput } from "ra-ui-materialui";
import { useMemberAutocompleteInput } from "./index.hook";
import { Grid, Typography } from "@material-ui/core";
import defaultProfilePicture from "assets/images/defaultProfileImage.jpg";
import { Member } from "models/Member";

interface IMemberAutocompleteInputProps {
  name: string;
  surname: string;
  id: string;
  label: string;
  choices: any[];
}

const OptionRenderer = (choice: { record?: Member }) => {
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      style={{ width: "100%" }}
    >
      <Grid item sm={1}>
        <img
          style={{
            borderRadius: "50%",
            border: "1px solid #241D2D",
            width: 35,
            height: 35,
            objectFit: "cover",
          }}
          src={
            choice.record?.MemberProfilePictureURL
              ? choice.record?.MemberProfilePictureURL
              : defaultProfilePicture
          }
          alt="profileimg"
          width="25"
        />
      </Grid>
      <Grid item sm={2}>
        <Typography>{choice.record?.MemberName}</Typography>
      </Grid>
      <Grid item sm={2}>
        <Typography>{choice.record?.MemberSurname}</Typography>
      </Grid>
      <Grid item sm={3}>
        <Typography>{choice.record?.MemberPhoneNumber}</Typography>
      </Grid>
      <Grid item sm={3}>
        <Typography>{choice.record?.email}</Typography>
      </Grid>
    </Grid>
  );
};

const MemberAutocompleteInput = ({
  name,
  surname,
  id,
  label,
  choices,
}: IMemberAutocompleteInputProps) => {
  const { matchSuggestion, inputText, styles } = useMemberAutocompleteInput({
    name,
    surname,
  });

  return (
    <AutocompleteInput
      label={label}
      fullWidth
      source={id}
      choices={choices}
      optionText={<OptionRenderer />}
      options={{ InputProps: { className: styles.inputBgWhite } }}
      inputText={inputText}
      matchSuggestion={matchSuggestion}
      variant="outlined"
    />
  );
};

export default memo(MemberAutocompleteInput);
