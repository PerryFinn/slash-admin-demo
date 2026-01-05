import { Navigate, type RouteObject } from "react-router";
import { authRoutes } from "./auth";
import { dashboardRoutes } from "./dashboard";
import { errorsRoutes } from "./errors";

export const appRoutes: RouteObject[] = [
  // Auth
  ...authRoutes,
  // Dashboard
  ...dashboardRoutes,
  // Main
  ...errorsRoutes,
  // No Match
  { path: "*", element: <Navigate to="/404" replace /> },
];
