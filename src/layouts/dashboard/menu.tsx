import type { MenuDataItem } from "@ant-design/pro-components";
import type { RouteObject } from "react-router";
import type { MenuMeta } from "@/routes/sections/main/menu-meta";

const normalizePath = (value: string) => value.replace(/\/+/g, "/");

const joinPath = (parent: string, current?: string) => {
  if (!current) return parent || "/";
  if (current.startsWith("/")) return normalizePath(current);
  const merged = [parent, current].filter(Boolean).join("/");
  const normalized = normalizePath(merged);
  return normalized.startsWith("/") ? normalized : `/${normalized}`;
};

/**
 * 将 React Router 路由树转换为 ProLayout 菜单数据
 */
export const routesToMenu = (routes: RouteObject[], parentPath = ""): MenuDataItem[] => {
  return routes.reduce<MenuDataItem[]>((items, route) => {
    const meta = route.handle as MenuMeta | undefined;
    const nextParent = route.path ? joinPath(parentPath, route.path) : parentPath;
    const children = route.children ? routesToMenu(route.children, nextParent) : [];

    if (route.index || meta?.hideInMenu) {
      // 允许展示子节点（用于隐藏父级或详情页）
      if (children.length) items.push(...children);
      return items;
    }

    if (!route.path) {
      if (children.length) items.push(...children);
      return items;
    }

    const menuItem: MenuDataItem = {
      path: nextParent,
      name: meta?.name ?? route.path,
      //@ts-expect-error MenuDataItem['routes'] 是错误的类型定义，这里消除 ts 检查
      routes: children.length ? children : [],
      icon: meta?.icon,
    };

    items.push(menuItem);
    return items;
  }, []);
};
