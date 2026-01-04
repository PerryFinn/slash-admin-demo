import { HttpResponse, http } from "msw";
import zhCN from "@/locales/lang/zh_CN";
import { ResultStatus } from "@/types/enum";
import { convertFlatToTree } from "@/utils/tree";
import { DB_MENU } from "../assets_backup";

const getZh = (key?: string) => {
  if (!key) return key;
  const parts = key.split(".");
  let current: any = zhCN;
  for (const part of parts) {
    current = current?.[part];
  }
  return typeof current === "string" ? current : key;
};

const mapMenu = (item: any): any => {
  const children = item.children?.map(mapMenu);
  return {
    ...item,
    name: getZh(item.name),
    caption: item.caption ? getZh(item.caption) : item.caption,
    ...(children ? { children } : {}),
  };
};

const menuList = http.get("/api/menu", async () => {
  const menuTree = convertFlatToTree(DB_MENU).map(mapMenu);
  return HttpResponse.json(
    {
      message: "",
      data: menuTree,
      status: ResultStatus.SUCCESS, // business status
    },
    {
      status: 200, // http status
    },
  );
});

export { menuList };
