import { observer } from "mobx-react-lite";
import { ThemeLayout } from "#/enum";
import Logo from "@/components/logo";
import { settingStore } from "@/store/settingStore";
import Header from "./header";
import Main from "./main";
import { NavHorizontalLayout, NavVerticalLayout, useFilteredNavData } from "./nav";

export default function DashboardLayout() {
  return (
    <div data-slot="slash-layout-root" className="w-full min-h-screen bg-background">
      <PcLayout />
    </div>
  );
}

const PcLayout = observer(() => {
  const { themeLayout } = settingStore.snapshot;

  if (themeLayout === ThemeLayout.Horizontal) return <PcHorizontalLayout />;
  return <PcVerticalLayout />;
});

function PcHorizontalLayout() {
  const navData = useFilteredNavData();
  return (
    <>
      {/* Sticky Header */}
      <Header leftSlot={<Logo />} />
      {/* Sticky Nav */}
      <NavHorizontalLayout data={navData} />

      <Main />
    </>
  );
}

const PcVerticalLayout = observer(() => {
  const settings = settingStore.snapshot;
  const { themeLayout } = settings;
  const navData = useFilteredNavData();

  const mainPaddingLeft =
    themeLayout === ThemeLayout.Vertical ? "var(--layout-nav-width)" : "var(--layout-nav-width-mini)";

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
