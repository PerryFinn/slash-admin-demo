import type { ThemeConfig } from "antd";
import { App, ConfigProvider, theme } from "antd";
import { observer } from "mobx-react-lite";
import { ThemeMode } from "#/enum";
import useLocale from "@/locales/use-locale";
import { settingStore } from "@/store/settingStore";
import { removePx } from "@/utils/theme";
import { baseThemeTokens } from "../tokens/base";
import { darkColorTokens, lightColorTokens, presetsColors } from "../tokens/color";
import type { UILibraryAdapter } from "../type";
import styles from "./antd.adapter.module.less";

export const AntdAdapter: UILibraryAdapter = observer(({ mode, children }) => {
  const { language } = useLocale();
  const { themeColorPresets, fontFamily, fontSize } = settingStore.snapshot;
  const algorithm = mode === ThemeMode.Light ? theme.defaultAlgorithm : theme.darkAlgorithm;

  const colorTokens = mode === ThemeMode.Light ? lightColorTokens : darkColorTokens;

  const primaryColorToken = presetsColors[themeColorPresets];

  const token: ThemeConfig["token"] = {
    colorPrimary: primaryColorToken.default,
    colorSuccess: colorTokens.palette.success.default,
    colorWarning: colorTokens.palette.warning.default,
    colorError: colorTokens.palette.error.default,
    colorInfo: colorTokens.palette.info.default,

    colorBgLayout: colorTokens.background.default,
    colorBgContainer: colorTokens.background.paper,
    colorBgElevated: colorTokens.background.default,

    wireframe: false,
    fontFamily: fontFamily,
    fontSize: fontSize,

    borderRadiusSM: removePx(baseThemeTokens.borderRadius.sm),
    borderRadius: removePx(baseThemeTokens.borderRadius.default),
    borderRadiusLG: removePx(baseThemeTokens.borderRadius.lg),
  };

  const components: ThemeConfig["components"] = {
    Breadcrumb: {
      separatorMargin: removePx(baseThemeTokens.spacing[1]),
    },
    Menu: {
      colorFillAlter: "transparent",
      itemColor: colorTokens.text.secondary,
      motionDurationMid: "0.125s",
      motionDurationSlow: "0.125s",
      darkItemBg: darkColorTokens.background.default,
    },
    Layout: {
      siderBg: darkColorTokens.background.default,
    },
  };

  return (
    <ConfigProvider
      locale={language.antdLocal}
      theme={{ algorithm, token, components }}
      tag={{ className: styles.tag }}
    >
      <App>{children}</App>
    </ConfigProvider>
  );
});
