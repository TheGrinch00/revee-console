import { Edit, EditProps, TextInput, SimpleForm } from "react-admin";

export const FacilityEdit = (props: EditProps) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput
          color="secondary"
          label="Nome"
          source="FacilityName"
          variant="outlined"
        />
        <TextInput
          color="secondary"
          label="Via"
          source="Street"
          variant="outlined"
        />
        <TextInput
          color="secondary"
          label="Numero Civico"
          source="HouseNumber"
          variant="outlined"
        />
        <TextInput
          color="secondary"
          label="Codice Postale"
          source="PostalCode"
          variant="outlined"
        />
        <TextInput
          color="secondary"
          label="Provincia"
          source="Division"
          variant="outlined"
        />
        <TextInput
          color="secondary"
          label="Regione"
          source="Region"
          variant="outlined"
        />
        <TextInput
          color="secondary"
          label="Website"
          source="Website"
          variant="outlined"
        />
      </SimpleForm>
    </Edit>
  );
};
