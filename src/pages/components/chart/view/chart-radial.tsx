import { observer } from "mobx-react-lite";
import { Chart, useChart } from "@/components/chart";
import { settingStore } from "@/store/settingStore";
import { getResolvedThemeTokens } from "@/theme/theme-vars";
import { fNumber } from "@/utils/format-number";
import { rgbAlpha } from "@/utils/theme";

const series = [44, 55];
const ChartRadial = observer(() => {
  const { themeMode, themeColorPresets } = settingStore.snapshot;
  const tokens = getResolvedThemeTokens({ themeMode, themeColorPresets });
  const labels = ["Apples", "Oranges"];
  const trackColor = rgbAlpha(tokens.colors.palette.gray[500], 0.2);
  const ringColors = [tokens.colors.palette.primary.default, tokens.colors.palette.info.default];

  const option = useChart({
    tooltip: { trigger: "item" },
    legend: { show: true, bottom: 0, left: "center" },
    graphic: [
      {
        type: "text",
        left: "center",
        top: "44%",
        style: {
          text: fNumber(2324),
          fontSize: 22,
          fontWeight: 700,
          fill: tokens.colors.text.primary,
        },
      },
      {
        type: "text",
        left: "center",
        top: "54%",
        style: {
          text: "Total",
          fontSize: 12,
          fill: tokens.colors.text.secondary,
        },
      },
    ],
    series: labels.map((name, index) => ({
      name,
      type: "gauge",
      startAngle: 90,
      endAngle: -270,
      radius: index === 0 ? "90%" : "70%",
      pointer: { show: false },
      progress: { show: true, roundCap: true, itemStyle: { color: ringColors[index] } },
      axisLine: { lineStyle: { width: 12, color: [[1, trackColor]] } },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: { show: false },
      title: { show: false },
      detail: { show: false },
      data: [{ value: series[index], name }],
    })),
  });

  return <Chart option={option} height={320} />;
});

export default ChartRadial;
