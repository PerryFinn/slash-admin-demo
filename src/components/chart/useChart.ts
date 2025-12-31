import { mergeDeepRight } from "ramda";
import { useSettings } from "@/store/settingStore";
import { getResolvedThemeTokens } from "@/theme/theme-vars";
import type { ThemeColorPresets, ThemeMode } from "@/types/enum";
import { rgbAlpha } from "@/utils/theme";
import type { EChartsOption } from "echarts";

export function useChart(options: EChartsOption) {
  const { themeColorPresets, themeMode } = useSettings();

  const baseOptions = baseChartOptions(themeMode, themeColorPresets) ?? {};
  return mergeDeepRight(baseOptions, options) as EChartsOption;
}

const baseChartOptions = (themeMode: ThemeMode, themeColorPresets: ThemeColorPresets): EChartsOption => {
  const tokens = getResolvedThemeTokens({ themeMode, themeColorPresets });
  const fontSizeSm = Number(tokens.typography.fontSize.sm);

  return {
    animation: true,
    animationDuration: 360,
    color: [
      tokens.colors.palette.primary.default,
      tokens.colors.palette.info.default,
      tokens.colors.palette.warning.default,
      tokens.colors.palette.error.default,
      tokens.colors.palette.success.default,
      tokens.colors.palette.warning.dark,
      tokens.colors.palette.info.dark,
      tokens.colors.palette.error.dark,
      tokens.colors.palette.success.dark,
    ],
    textStyle: {
      color: tokens.colors.text.primary,
      fontFamily: tokens.typography.fontFamily.openSans,
      fontSize: fontSizeSm,
    },
    grid: {
      left: 0,
      right: 0,
      top: 24,
      bottom: 0,
      containLabel: true,
    },
    legend: {
      show: false,
      textStyle: {
        color: tokens.colors.text.primary,
        fontSize: fontSizeSm,
        fontWeight: 500,
      },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: rgbAlpha(tokens.colors.background.paper, 0.9),
      borderWidth: 0,
      textStyle: {
        color: tokens.colors.text.primary,
        fontSize: fontSizeSm,
      },
      extraCssText: `border-radius: ${tokens.borderRadius.xl}; backdrop-filter: blur(6px); box-shadow: ${tokens.shadows.card};`,
    },
  };
};
