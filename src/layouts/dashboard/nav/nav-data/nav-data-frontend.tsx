import { Icon } from "@/components/icon";
import type { NavProps } from "@/components/nav";
import { Badge } from "@/ui/badge";

export const frontendNavData: NavProps["data"] = [
  {
    name: "仪表板",
    items: [
      {
        title: "工作台",
        path: "/workbench",
        icon: <Icon icon="local:ic-workbench" size="24" />,
      },
      {
        title: "分析",
        path: "/analysis",
        icon: <Icon icon="local:ic-analysis" size="24" />,
      },
    ],
  },
  {
    name: "页面",
    items: [
      // management
      {
        title: "管理",
        path: "/management",
        icon: <Icon icon="local:ic-management" size="24" />,
        children: [
          {
            title: "用户",
            path: "/management/user",
            children: [
              {
                title: "个人资料",
                path: "/management/user/profile",
              },
              {
                title: "账户",
                path: "/management/user/account",
              },
            ],
          },
          {
            title: "系统",
            path: "/management/system",
            children: [
              {
                title: "权限",
                path: "/management/system/permission",
              },
              {
                title: "角色",
                path: "/management/system/role",
              },
              {
                title: "用户",
                path: "/management/system/user",
              },
            ],
          },
        ],
      },
      // menulevel
      {
        title: "多级菜单",
        path: "/menu_level",
        icon: <Icon icon="local:ic-menulevel" size="24" />,
        children: [
          {
            title: "多级菜单 1a",
            path: "/menu_level/1a",
          },
          {
            title: "多级菜单 1b",
            path: "/menu_level/1b",
            children: [
              {
                title: "多级菜单 2a",
                path: "/menu_level/1b/2a",
              },
              {
                title: "多级菜单 2b",
                path: "/menu_level/1b/2b",
                children: [
                  {
                    title: "多级菜单 3a",
                    path: "/menu_level/1b/2b/3a",
                  },
                  {
                    title: "多级菜单 3b",
                    path: "/menu_level/1b/2b/3b",
                  },
                ],
              },
            ],
          },
        ],
      },
      // errors
      {
        title: "异常页",
        path: "/error",
        icon: <Icon icon="bxs:error-alt" size="24" />,
        children: [
          {
            title: "403",
            path: "/error/403",
          },
          {
            title: "404",
            path: "/error/404",
          },
          {
            title: "500",
            path: "/error/500",
          },
        ],
      },
    ],
  },
  {
    name: "UI",
    items: [
      // components
      {
        title: "组件",
        path: "/components",
        icon: <Icon icon="solar:widget-5-bold-duotone" size="24" />,
        caption: "自定义UI组件",
        children: [
          {
            title: "图标",
            path: "/components/icon",
          },
          {
            title: "动画",
            path: "/components/animate",
          },
          {
            title: "滚动",
            path: "/components/scroll",
          },
          {
            title: "多语言",
            path: "/components/multi-language",
          },
          {
            title: "上传",
            path: "/components/upload",
          },
          {
            title: "图表",
            path: "/components/chart",
          },
          {
            title: "Toast",
            path: "/components/toast",
          },
        ],
      },
      // functions
      {
        title: "功能",
        path: "/functions",
        icon: <Icon icon="solar:plain-2-bold-duotone" size="24" />,
        children: [
          {
            title: "剪贴板",
            path: "/functions/clipboard",
          },
          {
            title: "Token失效",
            path: "/functions/token_expired",
          },
        ],
      },
    ],
  },
  {
    name: "其他",
    items: [
      {
        title: "权限",
        path: "/permission",
        icon: <Icon icon="mingcute:safe-lock-fill" size="24" />,
      },
      {
        title: "页面鉴权测试",
        path: "/permission/page-test",
        icon: <Icon icon="mingcute:safe-lock-fill" size="24" />,
        auth: ["permission:read"],
        hidden: true,
      },
      {
        title: "看板",
        path: "/kanban",
        icon: <Icon icon="solar:clipboard-bold-duotone" size="24" />,
      },
      {
        title: "项目禁用",
        path: "/disabled",
        icon: <Icon icon="local:ic-disabled" size="24" />,
        disabled: true,
      },
      {
        title: "项目标签",
        path: "#label",
        icon: <Icon icon="local:ic-label" size="24" />,
        info: (
          <Badge variant="info">
            <Icon icon="solar:bell-bing-bold-duotone" size={14} />新
          </Badge>
        ),
      },
      {
        title: "链接",
        path: "/link",
        icon: <Icon icon="local:ic-external" size="24" />,
        children: [
          {
            title: "外链",
            path: "/link/external-link",
          },
          {
            title: "内嵌",
            path: "/link/iframe",
          },
        ],
      },
      {
        title: "空白",
        path: "/blank",
        icon: <Icon icon="local:ic-blank" size="24" />,
      },
    ],
  },
];
