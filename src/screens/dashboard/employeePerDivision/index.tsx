import React from "react";
import { Pie, PieChart } from "recharts";
import theme from "theme";
import { useEmployeePerDivision } from "./index.hook";

export const EmployeePerDivision = () => {
  const { data, renderActiveShape, activeIndex, onPieEnter } =
    useEmployeePerDivision();

  return (
    <PieChart width={700} height={450}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={data}
        cx={350}
        cy={225}
        innerRadius={60}
        outerRadius={175}
        fill={theme.palette.primary.main}
        dataKey="value"
        onMouseEnter={onPieEnter}
      />
    </PieChart>
  );
};
