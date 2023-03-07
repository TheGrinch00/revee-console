import "moment/locale/it";
import "firebase/auth";

import { Admin, Resource } from "react-admin";
import {
  BloodtypeOutlined,
  CalendarTodayOutlined,
  CardGiftcardRounded,
  CardMembershipOutlined,
  CategoryOutlined,
  HomeWorkOutlined,
  LocalHospitalOutlined,
  LocalOfferOutlined,
  MasksOutlined,
  WorkOutlineRounded,
} from "@mui/icons-material";
import { EmployeeEdit, EmployeeList, EmployeeShow } from "resources/employee";
import { FacilityEdit, FacilityList } from "resources/facility";
import { MemberEdit, MemberList, MemberShow } from "resources/member";
import { PositionEdit, PositionList } from "resources/position";
import { ProductEdit, ProductList, ProductShow } from "resources/product";
import { SampleEdit, SampleList } from "resources/sample";
import { VisitEdit, VisitList } from "resources/visit";
import { reducers, sagas } from "./redux-store";

import { Dashboard } from "screens/dashboard";
import { EmploymentsList } from "resources/employment";
import { FacilityTypeList } from "resources/facilityType";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ProductCategoryList } from "resources/productCategory";
import { Roles } from "redux-store/slices/login/interfaces";
import { WardsList } from "resources/ward";
import customAuthProvider from "./customAuthProvider";
import customDataProvider from "./customDataProvider";
import customLoginPage from "./screens/customLoginPage";
import firebase from "firebase/app";
import moment from "moment";
// import { i18nProvider } from "./i18n/i18nProvider";
import theme from "./theme";
import { useEffect } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyDaghKSAoSOcL2_bwrWjASy7BmCaKdlT_A",
  authDomain: "revee-cms.firebaseapp.com",
  projectId: "revee-cms",
  storageBucket: "revee-cms.appspot.com",
  messagingSenderId: "685449083250",
  appId: "1:685449083250:web:71e7bac5206959c17505eb",
  measurementId: "G-RBKSRQQNE6",
};

firebase.initializeApp(firebaseConfig, "[DEFAULT]");
firebase.auth().languageCode = "it";

const App = () => {
  useEffect(() => {
    moment.locale("it");
  }, []);

  return (
    <GoogleOAuthProvider clientId="685449083250-9rokh7tfsb1lb602tlgkt0m2eu1mrt0s.apps.googleusercontent.com">
      <Admin
        customSagas={sagas}
        customReducers={reducers}
        theme={theme}
        dataProvider={customDataProvider}
        loginPage={customLoginPage}
        authProvider={customAuthProvider}
        dashboard={Dashboard}
      >
        {(permissions) => [
          <Resource
            name="Visits"
            icon={CalendarTodayOutlined}
            options={{ label: "Visite" }}
            list={VisitList}
            edit={VisitEdit}
          />,
          <Resource
            name="Members"
            options={{ label: "Agenti" }}
            icon={CardMembershipOutlined}
            list={MemberList}
            show={MemberShow}
            edit={(permissions as Roles) === Roles.ADMIN ? MemberEdit : undefined}
          />,
          <Resource
            name="Employees"
            icon={MasksOutlined}
            options={{ label: "Medici" }}
            list={EmployeeList}
            show={EmployeeShow}
            edit={
              (permissions as Roles) === Roles.ADMIN ? EmployeeEdit : undefined
            }
          />,
          <Resource
            name="Positions"
            options={{ label: "Posizioni" }}
            list={PositionList}
            edit={
              (permissions as Roles) === Roles.ADMIN ? PositionEdit : undefined
            }
          />,
          <Resource name="Categories" />,
          <Resource
            name="Facilities"
            icon={LocalHospitalOutlined}
            options={{ label: "Ospedali" }}
            list={FacilityList}
            edit={
              (permissions as Roles) === Roles.ADMIN ? FacilityEdit : undefined
            }
          />,
          <Resource
            name="FacilityTypes"
            icon={HomeWorkOutlined}
            options={{ label: "Tipi di ospedale" }}
            list={
              (permissions as Roles) === Roles.ADMIN
                ? FacilityTypeList
                : undefined
            }
          />,
          <Resource
            name="Employments"
            icon={WorkOutlineRounded}
            options={{ label: "Impieghi" }}
            list={
              (permissions as Roles) === Roles.ADMIN ? EmploymentsList : undefined
            }
          />,
          <Resource
            name="Wards"
            icon={BloodtypeOutlined}
            options={{ label: "Reparti" }}
            list={(permissions as Roles) === Roles.ADMIN ? WardsList : undefined}
          />,
          <Resource name="Globals" intent="registration" />,
          <Resource name="allowedDivisions" intent="registration" />,
          <Resource
            name="Products"
            options={{ label: "Prodotti" }}
            icon={LocalOfferOutlined}
            list={ProductList}
            edit={
              (permissions as Roles) === Roles.ADMIN ? ProductEdit : undefined
            }
            show={ProductShow}
          />,
          <Resource
            name="ProductCategories"
            list={
              (permissions as Roles) === Roles.ADMIN
                ? ProductCategoryList
                : undefined
            }
            icon={CategoryOutlined}
            options={{ label: "Categorie" }}
          />,
          <Resource
            name="Samples"
            icon={CardGiftcardRounded}
            options={{ label: "Campioni" }}
            list={SampleList}
            edit={(permissions as Roles) === Roles.ADMIN ? SampleEdit : undefined}
          />,
        ]}
      </Admin>
    </GoogleOAuthProvider>
  );
};

export default App;
