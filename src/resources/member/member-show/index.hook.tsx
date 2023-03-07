import { Theme } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/styles";
import { ShowProps } from "react-admin";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { actions, selectors } from "redux-store";
import { DataGrid } from "@mui/x-data-grid";
import clsx from "clsx";
import { Button } from "@material-ui/core";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useRecordContext } from "react-admin";
import { useGetAccessToken } from "hooks/useGetAccessToken";

import {
  Bar,
  CartesianGrid,
  Cell,
  XAxis,
  YAxis,
  BarChart,
  LineChart,
  Line,
} from "recharts";
import theme from "theme";
import { Tabs, Tab } from "@material-ui/core";
const useStyles = makeStyles((theme: Theme) => ({
  mainContainer: {
    padding: "1.5em",
  },
  imageCard: {
    border: "1px solid",
    borderColor: theme.palette.primary.main,
    borderRadius: 25,
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    padding: "3em 0",
    height: "100%",
    boxSizing: "border-box",
    textAlign: "center",
  },
  anagraficCard: {
    border: "1px solid",
    borderColor: theme.palette.primary.main,
    borderRadius: 25,
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    height: "100%",
    boxSizing: "border-box",
    display: "flex",
  },
  textField: {
    marginLeft: "2em",
  },
  label: {
    color: "#a9a9a9",
    fontSize: 11,
  },
  bold: {
    "&>*": {
      fontWeight: "900!important",
    },
  },
  commentStyle: {
    textAlign: "center",
    padding: "0.5em 5em",
    fontSize: 11,
  },
  root: {
    "& .row.visited": {
      textAlign: "center",
      borderRadius: 100,
      backgroundColor: "red!important",
      color: "white",
      display: "inline-block",
    },
    "& .row.neverVisited": {
      textAlign: "center",
      borderRadius: 100,
      backgroundColor: "#ffd740",
      color: "white",
    },
    height: 400,
    width: "100%",
    padding: 20,
  },
}));

const MemberTitle = () => {
  const record = useRecordContext();
  return (
    <span>
      Agente{record ? `: ${record.MemberName} ${record.MemberSurname}` : ""}
    </span>
  );
};

const columns = [
  {
    field: "firstName",
    headerName: "Nome",
    width: 180,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Cognome",
    width: 180,
    editable: true,
  },
  {
    field: "phoneNumber",
    headerName: "Numero di telefono",
    width: 220,
    editable: true,
  },
  {
    field: "expiredDays",
    headerName: "Scaduto Da",
    width: 170,
    editable: true,
    cellClassName: (params: any) =>
      clsx("row", {
        neverVisited: params.value === "MAI VISITATO",
        visited: params.value !== "MAI VISITATO",
      }),
  },
  {
    field: "showButton",
    headerName: "Mostra",
    width: 150,
    editable: true,
    sortable: false,
    renderCell: (params: any) => {
      const onClick = (e: any) => {
        window.location.href = params.value;
      };

      return (
        <Button onClick={onClick} startIcon={<VisibilityIcon />}>
          MOSTRA
        </Button>
      );
    },
  },
];

const Expire = () => {
  const dispatch = useDispatch();
  const styles = useStyles();
  const record = useRecordContext();

  const { token } = useGetAccessToken();

  useEffect(() => {
    dispatch(
      actions.fetchExpiredDoctors({
        memberId: record!.id as number,
        token,
      })
    );
  }, [token, record, dispatch]);
  const expiredDoctors = useSelector(selectors.getExpiredDoctors);

  const rows = useMemo(
    () =>
      expiredDoctors.map((element) => {
        let expiredDays;
        if (element.daysExpired < 0) {
          expiredDays = "MAI VISITATO";
        } else {
          expiredDays = `${element.daysExpired} GIORNI`;
        }

        return {
          id: element.id,
          firstName: element.EmployeeName,
          lastName: element.EmployeeSurname,
          phoneNumber: element.EmployeePhoneNumber,
          expiredDays,
          showButton: `#/Employees/${element.id}/show`,
        };
      }),
    [expiredDoctors]
  );

  return (
    <div className={styles.root}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};

export const SamplesGraph = () => {
  const [value, setValue] = useState("oneYear");

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };
  const data = useSelector(selectors.getSamplesStat);

  const dataRightFormat: any = {};
  for (const tab of Object.entries(data)) {
    const temp: any[] = [];

    for (const [name, value] of Object.entries(tab[1].value)) {
      temp.push({ name: name, value: value });
    }
    dataRightFormat[tab[1].name] = temp;
  }

  return (
    <Tabs
      orientation="horizontal"
      value={value}
      onChange={handleChange}
      variant="fullWidth"
    >
      <Tab value="oneYear" label="Un anno" />
      <Tab value="sixMonths" label="Sei Mesi" />
      <Tab value="oneMonth" label="Un mese" />
      <TabPanel value={value} index="oneYear">
        <BarChart
          width={900}
          height={300}
          data={dataRightFormat["oneYear"]}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Bar
            dataKey="value"
            fill={theme.palette.primary.main}
            label={{ position: "top" }}
          >
            {data.map((entry: any, index: any) => (
              <Cell key={`cell-${index}`} fill={theme.palette.primary.main} />
            ))}
          </Bar>
        </BarChart>
      </TabPanel>

      <TabPanel value={value} index="sixMonths">
        <BarChart
          width={900}
          height={300}
          data={dataRightFormat["sixMonths"]}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Bar
            dataKey="value"
            fill={theme.palette.primary.main}
            label={{ position: "top" }}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={theme.palette.primary.main} />
            ))}
          </Bar>
        </BarChart>
      </TabPanel>

      <TabPanel value={value} index="oneMonth">
        <BarChart
          width={900}
          height={300}
          data={dataRightFormat["oneMonth"]}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Bar
            dataKey="value"
            fill={theme.palette.primary.main}
            label={{ position: "top" }}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={theme.palette.primary.main} />
            ))}
          </Bar>
        </BarChart>
      </TabPanel>
    </Tabs>
  );
};

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div hidden={value !== index} {...other}>
      {value === index && children}
    </div>
  );
}
const LineChartTabbed = ({ type }: { type: string }) => {
  const [value, setValue] = useState("oneYear");

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const newMeds = useSelector(selectors.getNewMeds);
  const visitedEmployees = useSelector(selectors.getVisitedEmplyess);
  let data = [];
  switch (type) {
    case "newMeds":
      data = newMeds;
      break;
    case "visitedEmployees":
      data = visitedEmployees;
  }

  const dataRightFormat: any = {};
  for (const tab of Object.entries(data)) {
    const temp: any[] = [];

    for (const [name, value] of Object.entries(tab[1].value)) {
      temp.push({ name: name, value: value });
    }
    dataRightFormat[tab[1].name] = temp;
  }

  return (
    <Tabs value={value} onChange={handleChange} variant="fullWidth">
      <Tab value="oneYear" label="Un anno" />
      <Tab value="sixMonths" label="Sei Mesi" />
      <Tab value="oneMonth" label="Un mese" />
      <TabPanel value={value} index="oneYear">
        <LineChart
          width={900}
          height={300}
          data={dataRightFormat["oneYear"]}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis dataKey="value" />
          <Line dataKey="value" stroke={theme.palette.primary.main}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={theme.palette.primary.main} />
            ))}
          </Line>
        </LineChart>
      </TabPanel>

      <TabPanel value={value} index="sixMonths">
        <LineChart
          width={900}
          height={300}
          data={dataRightFormat["sixMonths"]}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis dataKey="value" />
          <Line dataKey="value" stroke={theme.palette.primary.main}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={theme.palette.primary.main} />
            ))}
          </Line>
        </LineChart>
      </TabPanel>

      <TabPanel value={value} index="oneMonth">
        <LineChart
          width={900}
          height={300}
          data={dataRightFormat["oneMonth"]}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis dataKey="value" />
          <Line dataKey="value" stroke={theme.palette.primary.main}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={theme.palette.primary.main} />
            ))}
          </Line>
        </LineChart>
      </TabPanel>
    </Tabs>
  );
};
export const useMemberShow = (props: ShowProps) => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const dispatch = useDispatch();

  useEffect(() => {
    let lbtoken = localStorage.getItem("lbtoken");
    lbtoken = lbtoken!.substr(1, lbtoken!.length - 2);
    dispatch(
      actions.fetchStatistics({
        token: lbtoken,
        general: false,
        id: `${props.id}`,
      })
    );
  }, [dispatch, props.id]);

  return { styles, MemberTitle, Expire, SamplesGraph, LineChartTabbed };
};
