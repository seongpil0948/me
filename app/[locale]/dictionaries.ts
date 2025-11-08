import "server-only";

import type { Dictionary } from "@/types/portfolio";

const dictionaries = {
  ko: () =>
    import("./dictionaries/ko.json").then(
      (module) => module.default as Dictionary
    ),
  en: () =>
    import("./dictionaries/en.json").then(
      (module) => module.default as Dictionary
    ),
  zh: () =>
    import("./dictionaries/zh.json").then(
      (module) => module.default as Dictionary
    ),
};

export type Locale = keyof typeof dictionaries;

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]();
