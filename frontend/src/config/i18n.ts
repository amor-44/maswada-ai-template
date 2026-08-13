import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

import en from "@/locales/en/translation.json"
import ar from "@/locales/ar/translation.json"

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    // Default language if nothing is stored yet
    fallbackLng: "en",
    // LanguageDetector will read from localStorage key "i18nextLng" automatically
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "i18nextLng",
    },
    interpolation: {
      escapeValue: false, // React already escapes
    },
  })

export default i18n
