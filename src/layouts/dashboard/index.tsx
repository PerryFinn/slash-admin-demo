import { ProLayout } from "@ant-design/pro-components";
import { useCallback, useMemo } from "react";
import { Link } from "react-router";
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
        location={{ pathname }}
        route={{
          routes: menuRoutes,
        }}
        menuItemRender={renderMenuItem}
      >
        <Main />
      </ProLayout>
    </div>
  );
}
