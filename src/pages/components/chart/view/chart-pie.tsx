import { Chart, useChart } from "@/components/chart";

const series = [44, 55, 13, 43];
export default function ChartPie() {
  const labels = ["America", "Asia", "Europe", "Africa"];
  const option = useChart({
    tooltip: { trigger: "item" },
    legend: { show: true, bottom: 0, left: "center" },
    series: [
      {
        type: "pie",
        radius: "70%",
        label: { show: true },
        data: labels.map((name, i) => ({ name, value: series[i] })),
      },
    ],
  });

  return <Chart option={option} height={320} />;
}
