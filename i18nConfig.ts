const i18nConfig = {
  locales: ["ko", "en", "zh"],
  defaultLocale: "ko",
  prefixDefault: false,
  localeCookie: "NEXT_LOCALE",
  serverSetCookie: "always" as const,
  cookieOptions: {
    sameSite: "strict" as const,
    maxAge: 31536000,
    path: "/",
  },
};

export default i18nConfig;
