import { Chart, useChart } from "@/components/chart";

const series = [
  {
    name: "Net Profit",
    data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
  },
  {
    name: "Revenue",
    data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
  },
];
export default function ChartColumnMultiple() {
  const categories = ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];
  const option = useChart({
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    xAxis: { type: "category", data: categories },
    yAxis: { type: "value" },
    series: series.map((s) => ({
      name: s.name,
      type: "bar",
      data: s.data,
      barWidth: 24,
    })),
  });

  return <Chart option={option} height={320} />;
}
