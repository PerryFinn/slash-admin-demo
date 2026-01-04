import { useLayoutEffect } from "react";
import { observer } from "mobx-react-lite";
import { HtmlDataAttribute } from "#/enum";
import { settingStore } from "@/store/settingStore";
import { applyThemeCssVars } from "./theme-vars";
import type { UILibraryAdapter } from "./type";

interface ThemeProviderProps {
  children: React.ReactNode;
  adapters?: UILibraryAdapter[];
}

export const ThemeProvider = observer(function ThemeProvider({ children, adapters = [] }: ThemeProviderProps) {
  const { themeMode, themeColorPresets, fontFamily, fontSize } = settingStore.snapshot;

  // 同步更新主题属性与 CSS 变量，避免闪烁
  useLayoutEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute(HtmlDataAttribute.ThemeMode, themeMode);
    root.setAttribute(HtmlDataAttribute.ColorPalette, themeColorPresets);
    applyThemeCssVars({ themeMode, themeColorPresets });
  }, [themeMode, themeColorPresets]);

  // Update font size and font family
  useLayoutEffect(() => {
    const root = window.document.documentElement;
    root.style.fontSize = `${fontSize}px`;

    const body = window.document.body;
    body.style.fontFamily = fontFamily;
  }, [fontFamily, fontSize]);

  // Wrap children with adapters
  const wrappedWithAdapters = adapters.reduce(
    (children, Adapter) => (
      <Adapter key={Adapter.name} mode={themeMode}>
        {children}
      </Adapter>
    ),
    children,
  );

  return wrappedWithAdapters;
});
