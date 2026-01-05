import { Navigate, type RouteObject } from "react-router";
import { GLOBAL_CONFIG } from "@/global-config";
import BasicLayout from "@/layouts/dashboard";
import LoginAuthGuard from "@/routes/components/login-auth-guard";
import { getFrontendRoutes } from "./frontend";

export const dashboardRoutes: RouteObject[] = [
  {
    element: (
      <LoginAuthGuard>
        <BasicLayout />
      </LoginAuthGuard>
    ),
    children: [{ index: true, element: <Navigate to={GLOBAL_CONFIG.defaultRoute} replace /> }, ...getFrontendRoutes()],
  },
];
