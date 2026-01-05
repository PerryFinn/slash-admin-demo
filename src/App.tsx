import { QueryClientProvider } from "@tanstack/react-query";
import { MotionLazy } from "./components/animate/motion-lazy";
import { RouteLoadingProgress } from "./components/loading";
import Toast from "./components/toast";
import { AntdAdapter } from "./theme/adapter/antd.adapter";
import { ThemeProvider } from "./theme/theme-provider";
import { queryClient } from "./utils/react-query";

if (import.meta.env.DEV) {
  import("react-scan").then(({ scan }) => {
    scan({
      enabled: false,
      showToolbar: true,
      log: false,
      animationSpeed: "fast",
    });
  });
}

function App({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider adapters={[AntdAdapter]}>
        <Toast />
        <RouteLoadingProgress />
        <MotionLazy>{children}</MotionLazy>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
