import { HtmlDataAttribute, StorageEnum, ThemeColorPresets, ThemeMode } from "#/enum";
import { addColorChannels, toCssVar } from "@/utils/theme";
import { baseThemeTokens } from "./tokens/base";
import { darkColorTokens, lightColorTokens, presetsColors } from "./tokens/color";
import { darkShadowTokens, lightShadowTokens } from "./tokens/shadow";
import { FontFamilyPreset, typographyTokens } from "./tokens/typography";

type PlainObject = Record<string, unknown>;

const DEFAULT_THEME_SETTINGS = {
  themeMode: ThemeMode.Light,
  themeColorPresets: ThemeColorPresets.Default,
  fontFamily: FontFamilyPreset.openSans,
  fontSize: Number(typographyTokens.fontSize.sm),
} as const;

type ThemeSettings = {
  themeMode: ThemeMode;
  themeColorPresets: ThemeColorPresets;
};

type PersistedSettings = {
  themeMode?: unknown;
  themeColorPresets?: unknown;
  fontFamily?: unknown;
  fontSize?: unknown;
};

type PersistedStorageShape = {
  state?: {
    settings?: PersistedSettings;
  };
};

type CssVarRefTree<T> = T extends object ? { [K in keyof T]: CssVarRefTree<T[K]> } : string;

const isPlainObject = (value: unknown): value is PlainObject => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

const isThemeMode = (value: unknown): value is ThemeMode => {
  return value === ThemeMode.Light || value === ThemeMode.Dark;
};

const isThemeColorPreset = (value: unknown): value is ThemeColorPresets => {
  return Object.values(ThemeColorPresets).includes(value as ThemeColorPresets);
};

export const getResolvedThemeTokens = (settings: ThemeSettings) => {
  const baseColors = settings.themeMode === ThemeMode.Light ? lightColorTokens : darkColorTokens;

  const colorTokens = addColorChannels({
    ...baseColors,
    palette: {
      ...baseColors.palette,
      primary: presetsColors[settings.themeColorPresets],
    },
  });

  return {
    ...baseThemeTokens,
    colors: colorTokens,
    typography: typographyTokens,
    shadows: settings.themeMode === ThemeMode.Light ? lightShadowTokens : darkShadowTokens,
  };
};

const buildCssVarRefTree = <T extends PlainObject>(obj: T, path: string[] = []): CssVarRefTree<T> => {
  const result: PlainObject = {};

  for (const [key, value] of Object.entries(obj)) {
    const nextPath = [...path, key];

    if (isPlainObject(value)) {
      result[key] = buildCssVarRefTree(value, nextPath);
      continue;
    }

    result[key] = `var(${toCssVar(nextPath.join("."))})`;
  }

  return result as CssVarRefTree<T>;
};

const buildCssVarValueMap = (obj: PlainObject, path: string[] = [], acc: Record<string, string> = {}) => {
  for (const [key, value] of Object.entries(obj)) {
    const nextPath = [...path, key];

    if (isPlainObject(value)) {
      buildCssVarValueMap(value, nextPath, acc);
      continue;
    }

    if (typeof value === "string") {
      acc[toCssVar(nextPath.join("."))] = value;
      continue;
    }

    if (typeof value === "number") {
      acc[toCssVar(nextPath.join("."))] = String(value);
      continue;
    }

    if (value === null || value === undefined) continue;

    acc[toCssVar(nextPath.join("."))] = String(value);
  }

  return acc;
};

export const themeVars = buildCssVarRefTree(getResolvedThemeTokens(DEFAULT_THEME_SETTINGS));

export const applyThemeCssVars = (settings: ThemeSettings) => {
  const tokens = getResolvedThemeTokens(settings) as unknown as PlainObject;
  const vars = buildCssVarValueMap(tokens);

  const root = window.document.documentElement;
  for (const [varName, varValue] of Object.entries(vars)) {
    root.style.setProperty(varName, varValue);
  }
};

const readPersistedSettings = (): PersistedSettings => {
  try {
    const raw = localStorage.getItem(StorageEnum.Settings);
    if (!raw) return {};

    const parsed = JSON.parse(raw) as PersistedStorageShape;
    return parsed?.state?.settings ?? {};
  } catch {
    return {};
  }
};

export const initThemeFromStorage = () => {
  const persisted = readPersistedSettings();

  const themeMode = isThemeMode(persisted.themeMode) ? persisted.themeMode : DEFAULT_THEME_SETTINGS.themeMode;
  const themeColorPresets = isThemeColorPreset(persisted.themeColorPresets)
    ? persisted.themeColorPresets
    : DEFAULT_THEME_SETTINGS.themeColorPresets;
  const fontFamily =
    typeof persisted.fontFamily === "string" ? persisted.fontFamily : DEFAULT_THEME_SETTINGS.fontFamily;
  const fontSize = typeof persisted.fontSize === "number" ? persisted.fontSize : DEFAULT_THEME_SETTINGS.fontSize;

  const root = window.document.documentElement;
  root.setAttribute(HtmlDataAttribute.ThemeMode, themeMode);
  root.setAttribute(HtmlDataAttribute.ColorPalette, themeColorPresets);

  root.style.fontSize = `${fontSize}px`;
  window.document.body.style.fontFamily = fontFamily;

  applyThemeCssVars({ themeMode, themeColorPresets });
};
