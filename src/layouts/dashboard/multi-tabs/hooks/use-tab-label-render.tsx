import { useMemo } from "react";
import { USER_LIST } from "@/_mock/assets";
import zhCN from "@/locales/lang/zh_CN";
import type { KeepAliveTab } from "../types";

const getZh = (key: string) => {
  const parts = key.split(".");
  let current: any = zhCN;
  for (const part of parts) {
    current = current?.[part];
  }
  return typeof current === "string" ? current : key;
};

export function useTabLabelRender() {
  const specialTabRenderMap = useMemo<Record<string, (tab: KeepAliveTab) => React.ReactNode>>(
    () => ({
      "sys.nav.system.user_detail": (tab: KeepAliveTab) => {
        const userId = tab.params?.id;
        const defaultLabel = getZh(tab.label);
        if (userId) {
          const user = USER_LIST.find((item) => item.id === userId);
          return `${user?.username}-${defaultLabel}`;
        }
        return defaultLabel;
      },
    }),
    [],
  );

  const renderTabLabel = (tab: KeepAliveTab) => {
    const specialRender = specialTabRenderMap[tab.label];
    if (specialRender) {
      return specialRender(tab);
    }
    return getZh(tab.label);
  };

  return renderTabLabel;
}
