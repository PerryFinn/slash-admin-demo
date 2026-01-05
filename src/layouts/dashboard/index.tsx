import { observer } from "mobx-react-lite";
import Header from "./header";
import Main from "./main";
import { NavVerticalLayout, useFilteredNavData } from "./nav";

export default function DashboardLayout() {
  return (
    <div data-slot="slash-layout-root" className="w-full min-h-screen bg-background">
      <PcVerticalLayout />
    </div>
  );
}

const PcVerticalLayout = observer(() => {
  const navData = useFilteredNavData();

  const mainPaddingLeft = "var(--layout-nav-width)";

  return (
    <>
      {/* Fixed Header */}
      <NavVerticalLayout data={navData} />

      <div
        className="relative w-full min-h-screen flex flex-col transition-[padding] duration-300 ease-in-out"
        style={{
          paddingLeft: mainPaddingLeft,
        }}
      >
        <Header />
        <Main />
      </div>
    </>
  );
});
