import { Chart, useChart } from "@/components/chart";

const series = [
  {
    name: "Series 1",
    data: [80, 50, 30, 40, 100, 20],
  },
  {
    name: "Series 2",
    data: [20, 30, 40, 80, 20, 80],
  },
  {
    name: "Series 3",
    data: [44, 76, 78, 13, 43, 10],
  },
];
export default function ChartRadar() {
  const categories = ["2011", "2012", "2013", "2014", "2015", "2016"];
  const maxByIndex = categories.map((_, i) => Math.max(...series.map((s) => s.data[i] ?? 0)));
  const option = useChart({
    legend: { show: true, bottom: 0, left: "center" },
    tooltip: { trigger: "item" },
    radar: {
      radius: "70%",
      indicator: categories.map((name, i) => ({ name, max: Math.ceil(maxByIndex[i] * 1.2) || 1 })),
      splitNumber: 4,
    },
    series: [
      {
        type: "radar",
        areaStyle: { opacity: 0.1 },
        data: series.map((s) => ({ name: s.name, value: s.data })),
      },
    ],
  });

  return <Chart option={option} height={320} />;
}
