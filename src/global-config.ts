import { version as pkgVersion } from "../package.json";

/**
 * 全局应用配置类型定义
 */
export type GlobalConfig = {
  /** 应用名称 */
  appName: string;
  /** 应用版本号 */
  appVersion: string;
  /** 应用程序默认路由路径 */
  defaultRoute: string;
  /** 公共静态资源路径 */
  publicPath: string;
  /** API 端点的基础 URL */
  apiBaseUrl: string;
  /** 路由模式：前端路由或后端路由 */
  routerMode: "frontend" | "backend";
};

/**
 * 全局配置常量
 * 从环境变量和 `package.json` 中读取配置
 *
 * @warning
 * 请不要使用 `import.meta.env` 来获取配置，使用 `GLOBAL_CONFIG` 代替
 */
export const GLOBAL_CONFIG: GlobalConfig = {
  appName: "Slash Admin",
  appVersion: pkgVersion,
  defaultRoute: import.meta.env.VITE_APP_DEFAULT_ROUTE || "/workbench",
  publicPath: import.meta.env.VITE_APP_PUBLIC_PATH || "/",
  apiBaseUrl: import.meta.env.VITE_APP_API_BASE_URL || "/api",
  routerMode: import.meta.env.VITE_APP_ROUTER_MODE || "frontend",
};
