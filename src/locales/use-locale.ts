import "dayjs/locale/zh-cn";

import type { Locale as AntdLocal } from "antd/es/locale";
import en_US from "antd/locale/en_US";
import zh_CN from "antd/locale/zh_CN";
import dayjs from "dayjs";
import type { i18n } from "i18next";
import { LocalEnum } from "#/enum";

type Locale = keyof typeof LocalEnum;
type Language = {
  locale: keyof typeof LocalEnum;
  icon: string;
  label: string;
  antdLocal: AntdLocal;
};

export const LANGUAGE_MAP: Record<Locale, Language> = {
  [LocalEnum.zh_CN]: {
    locale: LocalEnum.zh_CN,
    label: "Chinese",
    icon: "flag-cn",
    antdLocal: zh_CN,
  },
  [LocalEnum.en_US]: {
    locale: LocalEnum.en_US,
    label: "English",
    icon: "flag-us",
    antdLocal: en_US,
  },
};
const i18nInstance: i18n | null = null;
export default function useLocale() {
  // const { t, i18n } = useTranslation();

  const locale = (i18nInstance?.resolvedLanguage || LocalEnum.zh_CN) as Locale;
  const language = LANGUAGE_MAP[locale];

  /**
   * localstorage -> i18nextLng change
   */
  const setLocale = (locale: Locale) => {
    if (!i18nInstance) return;
    i18nInstance.changeLanguage(locale);
    // set lang ant dayjs
    document.documentElement.lang = locale;
    dayjs.locale(locale);
  };

  return {
    // t,
    locale,
    language,
    setLocale,
  };
}
