import type { RouteObject } from "react-router";
import { Navigate } from "react-router";
import type { MenuMeta } from "./menu-meta";
import { Component } from "./utils";

export function getFrontendRoutes(): RouteObject[] {
  const frontendDashboardRoutes: RouteObject[] = [
    {
      path: "workbench",
      handle: { name: "工作台", icon: "local:ic-workbench" } satisfies MenuMeta,
      element: Component("/pages/dashboard/workbench"),
    },
    {
      path: "analysis",
      handle: { name: "分析", icon: "local:ic-analysis" } satisfies MenuMeta,
      element: Component("/pages/dashboard/analysis"),
    },
    {
      path: "components",
      handle: { name: "组件", icon: "solar:widget-5-bold-duotone" } satisfies MenuMeta,
      children: [
        { index: true, element: <Navigate to="animate" replace /> },
        {
          path: "animate",
          handle: { name: "动画" } satisfies MenuMeta,
          element: Component("/pages/components/animate"),
        },
        {
          path: "scroll",
          handle: { name: "滚动" } satisfies MenuMeta,
          element: Component("/pages/components/scroll"),
        },
        {
          path: "multi-language",
          handle: { name: "多语言" } satisfies MenuMeta,
          element: Component("/pages/components/multi-language"),
        },
        {
          path: "icon",
          handle: { name: "图标" } satisfies MenuMeta,
          element: Component("/pages/components/icon"),
        },
        {
          path: "upload",
          handle: { name: "上传" } satisfies MenuMeta,
          element: Component("/pages/components/upload"),
        },
        {
          path: "chart",
          handle: { name: "图表" } satisfies MenuMeta,
          element: Component("/pages/components/chart"),
        },
        {
          path: "toast",
          handle: { name: "Toast" } satisfies MenuMeta,
          element: Component("/pages/components/toast"),
        },
      ],
    },
    {
      path: "functions",
      handle: { name: "功能", icon: "solar:plain-2-bold-duotone" } satisfies MenuMeta,
      children: [
        { index: true, element: <Navigate to="clipboard" replace /> },
        {
          path: "clipboard",
          handle: { name: "剪贴板" } satisfies MenuMeta,
          element: Component("/pages/functions/clipboard"),
        },
        {
          path: "token_expired",
          handle: { name: "Token失效" } satisfies MenuMeta,
          element: Component("/pages/functions/token-expired"),
        },
      ],
    },
    {
      path: "management",
      handle: { name: "管理", icon: "local:ic-management" } satisfies MenuMeta,
      children: [
        { index: true, element: <Navigate to="user" replace /> },
        {
          path: "user",
          handle: { name: "用户" } satisfies MenuMeta,
          children: [
            { index: true, element: <Navigate to="profile" replace /> },
            {
              path: "profile",
              handle: { name: "个人资料" } satisfies MenuMeta,
              element: Component("/pages/management/user/profile"),
            },
            {
              path: "account",
              handle: { name: "账户" } satisfies MenuMeta,
              element: Component("/pages/management/user/account"),
            },
          ],
        },
        {
          path: "system",
          handle: { name: "系统" } satisfies MenuMeta,
          children: [
            { index: true, element: <Navigate to="permission" replace /> },
            {
              path: "permission",
              handle: { name: "权限" } satisfies MenuMeta,
              element: Component("/pages/management/system/permission"),
            },
            {
              path: "role",
              handle: { name: "角色" } satisfies MenuMeta,
              element: Component("/pages/management/system/role"),
            },
            {
              path: "user",
              handle: { name: "用户" } satisfies MenuMeta,
              element: Component("/pages/management/system/user"),
            },
            {
              path: "user/:id",
              handle: { name: "用户详情", hideInMenu: true } satisfies MenuMeta,
              element: Component("/pages/management/system/user/detail"),
            },
          ],
        },
      ],
    },
    {
      path: "error",
      handle: { name: "异常页", icon: "bxs:error-alt" } satisfies MenuMeta,
      children: [
        { index: true, element: <Navigate to="403" replace /> },
        {
          path: "403",
          handle: { name: "403" } satisfies MenuMeta,
          element: Component("/pages/sys/error/Page403"),
        },
        {
          path: "404",
          handle: { name: "404" } satisfies MenuMeta,
          element: Component("/pages/sys/error/Page404"),
        },
        {
          path: "500",
          handle: { name: "500" } satisfies MenuMeta,
          element: Component("/pages/sys/error/Page500"),
        },
      ],
    },
    {
      path: "menu_level",
      handle: { name: "多级菜单", icon: "local:ic-menulevel" } satisfies MenuMeta,
      children: [
        { index: true, element: <Navigate to="1a" replace /> },
        {
          path: "1a",
          handle: { name: "多级菜单 1a" } satisfies MenuMeta,
          element: Component("/pages/menu-level/menu-level-1a"),
        },
        {
          path: "1b",
          handle: { name: "多级菜单 1b" } satisfies MenuMeta,
          children: [
            { index: true, element: <Navigate to="2a" replace /> },
            {
              path: "2a",
              handle: { name: "多级菜单 2a" } satisfies MenuMeta,
              element: Component("/pages/menu-level/menu-level-1b/menu-level-2a"),
            },
            {
              path: "2b",
              handle: { name: "多级菜单 2b" } satisfies MenuMeta,
              children: [
                { index: true, element: <Navigate to="3a" replace /> },
                {
                  path: "3a",
                  handle: { name: "多级菜单 3a" } satisfies MenuMeta,
                  element: Component("/pages/menu-level/menu-level-1b/menu-level-2b/menu-level-3a"),
                },
                {
                  path: "3b",
                  handle: { name: "多级菜单 3b" } satisfies MenuMeta,
                  element: Component("/pages/menu-level/menu-level-1b/menu-level-2b/menu-level-3b"),
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: "link",
      handle: { name: "链接", icon: "local:ic-external" } satisfies MenuMeta,
      children: [
        { index: true, element: <Navigate to="iframe" replace /> },
        {
          path: "iframe",
          handle: { name: "内嵌" } satisfies MenuMeta,
          element: Component("/pages/sys/others/link/iframe", { src: "https://ant.design/index-cn" }),
        },
        {
          path: "external-link",
          handle: { name: "外链" } satisfies MenuMeta,
          element: Component("/pages/sys/others/link/external-link", { src: "https://ant.design/index-cn" }),
        },
      ],
    },
    {
      path: "permission",
      handle: { name: "权限", icon: "mingcute:safe-lock-fill" } satisfies MenuMeta,
      children: [
        {
          index: true,
          handle: { name: "权限" } satisfies MenuMeta,
          element: Component("/pages/sys/others/permission"),
        },
        {
          path: "page-test",
          handle: { name: "页面鉴权测试", hideInMenu: true } satisfies MenuMeta,
          element: Component("/pages/sys/others/permission/page-test"),
        },
      ],
    },
    {
      path: "kanban",
      handle: { name: "看板", icon: "solar:clipboard-bold-duotone" } satisfies MenuMeta,
      element: Component("/pages/sys/others/kanban"),
    },
    {
      path: "blank",
      handle: { name: "空白", icon: "local:ic-blank" } satisfies MenuMeta,
      element: Component("/pages/sys/others/blank"),
    },
  ];
  return frontendDashboardRoutes;
}
