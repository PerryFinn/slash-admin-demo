import { Chart, useChart } from "@/components/chart";

const series = [
  {
    name: "Desktops",
    data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
  },
];
export default function ChartLine() {
  const categories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];
  const option = useChart({
    xAxis: { type: "category", data: categories, boundaryGap: false },
    yAxis: { type: "value" },
    tooltip: { trigger: "axis" },
    series: series.map((s) => ({
      name: s.name,
      type: "line",
      smooth: true,
      showSymbol: false,
      data: s.data,
    })),
  });

  return <Chart option={option} height={320} />;
}
