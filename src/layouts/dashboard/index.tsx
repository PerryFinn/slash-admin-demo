import { ProLayout } from "@ant-design/pro-components";
import { useCallback, useMemo } from "react";
import { Link } from "react-router";
import { GLOBAL_CONFIG } from "@/global-config";
import { usePathname } from "@/routes/hooks";
import { getFrontendRoutes } from "@/routes/sections/main/frontend";
import Main from "./main";
import { routesToMenu } from "./menu";

export default function BasicLayout() {
  const pathname = usePathname();
  const menuRoutes = useMemo(() => routesToMenu(getFrontendRoutes()), []);

  const renderMenuItem = useCallback((item: any, dom: React.ReactNode) => {
    if (!item.path) return dom;
    return <Link to={item.path}>{dom}</Link>;
  }, []);

  return (
    <div className="w-full min-h-screen bg-background">
      <ProLayout
        title={GLOBAL_CONFIG.appName}
        location={{ pathname }}
        route={{
          routes: menuRoutes,
        }}
        token={{
          pageContainer: {
            paddingInlinePageContainerContent: 0,
            paddingBlockPageContainerContent: 0,
          },
        }}
        menuItemRender={renderMenuItem}
        headerRender={false}
      >
        <Main />
      </ProLayout>
    </div>
  );
}
