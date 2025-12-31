import { Chart, useChart } from "@/components/chart";

const series = [
  {
    name: "Team A",
    type: "column",
    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
  },
  {
    name: "Team B",
    type: "area",
    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
  },
  {
    name: "Team C",
    type: "line",
    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
  },
];

export default function ChartMixed() {
  const categories = [
    "01/01/2003",
    "02/01/2003",
    "03/01/2003",
    "04/01/2003",
    "05/01/2003",
    "06/01/2003",
    "07/01/2003",
    "08/01/2003",
    "09/01/2003",
    "10/01/2003",
    "11/01/2003",
  ];

  const option = useChart({
    legend: { show: true, top: 0 },
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    xAxis: { type: "category", data: categories },
    yAxis: { type: "value", name: "Points", min: 0 },
    series: series.map((s) => {
      if (s.type === "column") {
        return { name: s.name, type: "bar", data: s.data, barWidth: 20 };
      }
      if (s.type === "area") {
        return {
          name: s.name,
          type: "line",
          smooth: true,
          showSymbol: false,
          areaStyle: { opacity: 0.2 },
          lineStyle: { width: 2 },
          data: s.data,
        };
      }
      return { name: s.name, type: "line", smooth: true, showSymbol: false, lineStyle: { width: 3 }, data: s.data };
    }),
  });

  return <Chart option={option} height={320} />;
}
