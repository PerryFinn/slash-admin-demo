import { Chart, useChart } from "@/components/chart";

const series = [
  { name: "Product A", data: [44, 55, 41, 67, 22, 43] },
  { name: "Product B", data: [13, 23, 20, 8, 13, 27] },
  { name: "Product C", data: [11, 17, 15, 15, 21, 14] },
  { name: "Product D", data: [21, 7, 25, 13, 22, 8] },
];
export default function ChartColumnStacked() {
  const categories = [
    "01/01/2011 GMT",
    "01/02/2011 GMT",
    "01/03/2011 GMT",
    "01/04/2011 GMT",
    "01/05/2011 GMT",
    "01/06/2011 GMT",
  ];
  const option = useChart({
    grid: { left: 24, right: 96, top: 16, bottom: 0, containLabel: true },
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    legend: { show: true, right: 0, top: 20, orient: "vertical" },
    xAxis: { type: "category", data: categories },
    yAxis: { type: "value" },
    series: series.map((s) => ({
      name: s.name,
      type: "bar",
      stack: "total",
      emphasis: { focus: "series" },
      data: s.data,
      barWidth: 16,
    })),
  });

  return <Chart option={option} height={320} />;
}
