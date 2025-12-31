import { Chart, useChart } from "@/components/chart";

const series = [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380];

export default function ChartBar() {
  const categories = [
    "Italy",
    "Japan",
    "China",
    "Canada",
    "France",
    "Germany",
    "South Korea",
    "Netherlands",
    "United States",
    "United Kingdom",
  ];
  const option = useChart({
    grid: { left: 96, right: 24, top: 16, bottom: 0, containLabel: true },
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    xAxis: { type: "value" },
    yAxis: { type: "category", data: categories },
    series: [{ type: "bar", data: series, barWidth: 12 }],
  });

  return <Chart option={option} height={320} />;
}
