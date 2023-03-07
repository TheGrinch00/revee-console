import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";
import theme from "theme";
import { useEmployeePerCategory } from "./index.hook";

export const EmployeePerCategory = () => {
  const { data } = useEmployeePerCategory();

  return (
    <BarChart
      width={600}
      height={400}
      data={data}
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
  );
};
