import { useMemo } from "react";
import { useGetOne } from "react-admin";

export interface ProvinceData {
  shortName: string;
  province: string;
  region: string;
}

export const useGroupedProvinces = () => {
  const { data: provinces } = useGetOne("Globals", "province");

  const provincesArray: {
    province: string;
    region: string;
    shortName: string;
    selected: boolean;
  }[] = useMemo(
    () =>
      provinces?.province?.map(
        (province: {
          province: string;
          region: string;
          shortName: string;
        }) => ({
          ...province,
        })
      ) ?? [],
    [provinces]
  );

  const groupedProvinces = useMemo(
    () =>
      provincesArray.reduce(
        (group, current) => {
          const currentRegionIndex = group.findIndex(
            (item) => item.region === current.region
          );

          if (currentRegionIndex === -1) {
            group.push({
              region: current.region,
              provinces: [current],
            });
          } else {
            group[currentRegionIndex].provinces.push(current);
          }

          return group;
        },
        [] as {
          region: string;
          provinces: ProvinceData[];
        }[]
      ),
    [provincesArray]
  );

  return groupedProvinces;
};
