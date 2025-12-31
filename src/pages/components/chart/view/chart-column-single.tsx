import { Chart, useChart } from "@/components/chart";

const series = [{ name: "Net Profit", data: [44, 55, 57, 56, 61, 58, 63, 60, 66] }];
export default function ChartColumnSingle() {
  const categories = ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];
  const option = useChart({
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    xAxis: { type: "category", data: categories },
    yAxis: { type: "value" },
    series: series.map((s) => ({
      name: s.name,
      type: "bar",
      data: s.data,
      barWidth: 16,
    })),
  });

  return <Chart option={option} height={320} />;
}
