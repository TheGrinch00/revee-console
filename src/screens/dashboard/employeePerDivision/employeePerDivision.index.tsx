import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { Pie, PieChart } from "recharts";
import theme from "theme";
import { selectors } from "./../../../redux-store";
import { useEmployeePerDivision } from "./index.hook";

export const EmployeePerDivision = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const data = useSelector(selectors.getMedsPerProvince);
  const { styles, renderActiveShape } = useEmployeePerDivision();
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  return (
    <PieChart width={700} height={500}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={data}
        cx={350}
        cy={200}
        innerRadius={60}
        outerRadius={175}
        fill={theme.palette.primary.main}
        dataKey="value"
        onMouseEnter={onPieEnter}
      />
    </PieChart>
  );
};
