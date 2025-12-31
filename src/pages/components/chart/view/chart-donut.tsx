import { Chart, useChart } from "@/components/chart";

const series = [44, 55, 13, 43];
export default function ChartDonut() {
  const labels = ["Apple", "Mango", "Orange", "Watermelon"];
  const option = useChart({
    tooltip: { trigger: "item" },
    legend: { show: true, bottom: 0, left: "center" },
    series: [
      {
        type: "pie",
        radius: ["60%", "90%"],
        avoidLabelOverlap: true,
        label: { show: false },
        emphasis: { label: { show: true } },
        data: labels.map((name, i) => ({ name, value: series[i] })),
      },
    ],
  });

  return <Chart option={option} height={320} />;
}
