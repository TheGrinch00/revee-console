import { useCallback, useMemo } from "react";

import { actions } from "redux-store";

import { Province } from "models/Province";

import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/styles";

import { useQueryWithStore } from "react-admin";
import { Facility } from "models/Facility";

const useStyles = makeStyles(() => ({
  mainContainer: { width: "100%" },
}));

export const useFacilityCreate = () => {
  const dispatch = useDispatch();

  const { data } = useQueryWithStore({
    type: "getOne",
    resource: "globals",
    payload: { id: "province" },
  });

  const provincesData: Province[] = useMemo(() => {
    return data?.province ?? [];
  }, [data]);

  const facilityCreateValidator = useCallback((values: Facility) => {
    const errors: Omit<Facility, "TypeId"> & { TypeId?: string } = {};

    if (!values.FacilityName) {
      errors.FacilityName = "Questo campo è obbligatorio";
    }

    if (!values.Division) {
      errors.Division = "Questo campo è obbligatorio";
    }

    if (!values.Street) {
      errors.Street = "Questo campo è obbligatorio";
    }

    if (!values.HouseNumber) {
      errors.HouseNumber = "Questo campo è obbligatorio";
    }

    // If the user entered an email, check with a regex to make sure it's valid

    if (values.Email) {
      // I'm a nice person, here is the regex.
      const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!emailRegex.test(values.Email)) {
        errors.Email = "Inserisci una mail valida";
      }
    }

    // If the user entered a website, check with a regex to make sure it's valid
    if (values.Website) {
      // I'm a nice person, here is the regex.
      const websiteRegex =
        /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
      if (!websiteRegex.test(values.Website)) {
        errors.Website = "Inserisci un sito valido";
      }
    }

    // If the user entered a phone number, check with a regex to make sure it's valid
    if (values.PhoneNumber) {
      const phoneNumberRegex = /^[0-9]{10}$/; // Standard 10 digit phone number
      if (!phoneNumberRegex.test(values.PhoneNumber)) {
        errors.PhoneNumber =
          "Il numero deve essere di 10 cifre, senza codice paese";
      }
    }

    if (values.PostalCode) {
      const postalCodeRegex = /[0-9]{5}/;
      if (!postalCodeRegex.test(values.PostalCode)) {
        errors.PostalCode = "Il CAP deve essere formato da 5 cifre";
      }
    }

    if (!values.TypeId) {
      errors.TypeId = "Questo campo è obbligatorio";
    }

    return errors;
  }, []);

  // Transform data to be used in the select
  const regionsOptions: { id: string; value: string }[] = useMemo(() => {
    return provincesData.reduce((accumulator, provinceData) => {
      const isAlreadyAdded = accumulator.some(
        (option) => option.id === provinceData.region
      );

      if (!isAlreadyAdded) {
        accumulator.push({
          id: provinceData.region,
          value: provinceData.region,
        });
      }

      return accumulator;
    }, [] as { id: string; value: string }[]);
  }, [provincesData]);

  // Once the user selects a region, we need to get the provinces for that region
  const getProvincesOptions = useCallback(
    (region: string) => {
      return provincesData
        .filter((provinceData) => provinceData.region === region)
        .map((provinceData) => ({
          id: provinceData.shortName,
          value: provinceData.province,
        }));
    },
    [provincesData]
  );

  const onSuccesshHandle = useCallback(() => {
    dispatch(actions.setIsFacilityCreateDialogOpen(false));
  }, [dispatch]);

  const style = useStyles();

  return {
    onSuccesshHandle,
    style,
    getProvincesOptions,
    regionsOptions,
    facilityCreateValidator,
  };
};
