import "./global.css";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import { worker } from "./_mock";
import App from "./App";
import { registerLocalIcons } from "./components/icon";
import { GLOBAL_CONFIG } from "./global-config";
import ErrorBoundary from "./routes/components/error-boundary";
import { appRoutes } from "./routes/sections";
import { initThemeFromStorage } from "./theme/theme-vars";
import { urlJoin } from "./utils";

initThemeFromStorage();

await registerLocalIcons();
await worker.start({
  onUnhandledRequest: "bypass",
  serviceWorker: { url: urlJoin(GLOBAL_CONFIG.publicPath, "mockServiceWorker.js") },
});

const router = createBrowserRouter(
  [
    {
      Component: () => (
        <App>
          <Outlet />
        </App>
      ),
      errorElement: <ErrorBoundary />,
      children: appRoutes,
    },
  ],
  {
    basename: GLOBAL_CONFIG.publicPath,
  },
);

console.log("router :>> ", router, appRoutes);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<RouterProvider router={router} />);
