/**
 * 这里只处理和认证流程有关的路由，login/register/forgot-password/logout/callback 等
 */
import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router";
import { Outlet } from "react-router";

const LoginPage = lazy(() => import("@/pages/sys/login"));

export const authRoutes: RouteObject[] = [
  {
    path: "auth",
    element: (
      <Suspense>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
];
