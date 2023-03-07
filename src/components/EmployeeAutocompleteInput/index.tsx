import { memo } from "react";
import { AutocompleteInput } from "ra-ui-materialui";
import { useEmployeeAutocompleteInput } from "./index.hook";
import { Grid, Typography } from "@material-ui/core";
import defaultProfilePicture from "assets/images/defaultProfileImage.jpg";
import { Employee } from "models/Employee";

interface IEmployeeAutocompleteInputProps {
  name: string;
  surname: string;
  id: string;
  label: string;
  choices: any[];
}

const OptionRenderer = (choice: { record?: Employee }) => {
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
            choice.record?.EmployeeProfilePictureURL
              ? choice.record?.EmployeeProfilePictureURL
              : defaultProfilePicture
          }
          alt="profileimg"
          width="25"
        />
      </Grid>
      <Grid item sm={2}>
        <Typography>{choice.record?.EmployeeName}</Typography>
      </Grid>
      <Grid item sm={2}>
        <Typography>{choice.record?.EmployeeSurname}</Typography>
      </Grid>
      <Grid item sm={3}>
        <Typography>{choice.record?.EmployeePhoneNumber}</Typography>
      </Grid>
      <Grid item sm={3}>
        <Typography>{choice.record?.EmployeeEmail}</Typography>
      </Grid>
    </Grid>
  );
};

const EmployeeAutocompleteInput = ({
  name,
  surname,
  id,
  label,
  choices,
}: IEmployeeAutocompleteInputProps) => {
  const { styles, matchSuggestion, inputText } = useEmployeeAutocompleteInput({
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

export default memo(EmployeeAutocompleteInput);
