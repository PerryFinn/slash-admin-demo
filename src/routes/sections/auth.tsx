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
