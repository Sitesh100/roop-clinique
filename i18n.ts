// i18n.ts
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => {
  const fallbackLocale = "en";
  const selectedLocale = locale || fallbackLocale;

  try {
    const messages = (await import(`./messages/${selectedLocale}.json`))
      .default;

    return {
      locale: selectedLocale,
      messages,
    };
  } catch (error) {
    console.warn(
      `⚠️ Falling back to ${fallbackLocale} — could not load ${selectedLocale}.json`
    );
    const messages = (await import(`./messages/${fallbackLocale}.json`))
      .default;

    return {
      locale: fallbackLocale,
      messages,
    };
  }
});
