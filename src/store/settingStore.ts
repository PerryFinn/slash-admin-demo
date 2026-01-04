import { action, autorun, makeObservable, observable, toJS } from "mobx";
import { StorageEnum, ThemeColorPresets, ThemeLayout, ThemeMode } from "#/enum";
import { FontFamilyPreset, typographyTokens } from "@/theme/tokens/typography";

export type SettingsType = {
  themeColorPresets: ThemeColorPresets;
  themeMode: ThemeMode;
  themeLayout: ThemeLayout;
  themeStretch: boolean;
  breadCrumb: boolean;
  accordion: boolean;
  multiTab: boolean;
  darkSidebar: boolean;
  fontFamily: string;
  fontSize: number;
  direction: "ltr" | "rtl";
};

const SETTINGS_VERSION = 0;

const createDefaultSettings = (): SettingsType => ({
  themeColorPresets: ThemeColorPresets.Default,
  themeMode: ThemeMode.Light,
  themeLayout: ThemeLayout.Vertical,
  themeStretch: false,
  breadCrumb: true,
  accordion: false,
  multiTab: false,
  darkSidebar: false,
  fontFamily: FontFamilyPreset.openSans,
  fontSize: Number(typographyTokens.fontSize.sm),
  direction: "ltr",
});

class SettingStore {
  @observable accessor settings: SettingsType = createDefaultSettings();

  constructor() {
    makeObservable(this);
    this.hydrateFromStorage();
    this.setupPersistence();
  }

  get snapshot(): SettingsType {
    return toJS(this.settings);
  }

  @action
  setSettings(settings: SettingsType) {
    this.settings = settings;
  }

  @action
  clearSettings() {
    this.settings = createDefaultSettings();
    this.removePersistedSettings();
  }

  private hydrateFromStorage() {
    if (typeof window === "undefined") return;

    try {
      const raw = window.localStorage.getItem(StorageEnum.Settings);
      if (!raw) return;

      const parsed = JSON.parse(raw) as { state?: { settings?: SettingsType } };
      if (parsed?.state?.settings) {
        this.settings = { ...createDefaultSettings(), ...parsed.state.settings };
      }
    } catch (error) {
      console.error("[SettingStore] Failed to hydrate settings", error);
    }
  }

  private setupPersistence() {
    if (typeof window === "undefined") return;

    autorun(() => {
      const payload = {
        state: { settings: this.snapshot },
        version: SETTINGS_VERSION,
      };
      window.localStorage.setItem(StorageEnum.Settings, JSON.stringify(payload));
    });
  }

  private removePersistedSettings() {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(StorageEnum.Settings);
  }
}

export const settingStore = new SettingStore();
