/**
 * useLanguage
 *
 * Wraps react-i18next's language switching with automatic RTL/LTR
 * direction applied to the <html> element.
 *
 * Usage:
 *   const { language, toggleLanguage } = useLanguage()
 */

import { useTranslation } from "react-i18next"
import { useCallback } from "react"

const RTL_LANGUAGES = ["ar"]

function applyDirection(lang: string) {
  const dir = RTL_LANGUAGES.includes(lang) ? "rtl" : "ltr"
  document.documentElement.setAttribute("dir", dir)
  document.documentElement.setAttribute("lang", lang)
}

export function useLanguage() {
  const { i18n } = useTranslation()

  // Apply direction on every render in case language was loaded from storage
  applyDirection(i18n.language)

  const toggleLanguage = useCallback(() => {
    const next = i18n.language === "en" ? "ar" : "en"
    i18n.changeLanguage(next)   // persists to localStorage automatically
    applyDirection(next)
  }, [i18n])

  return {
    language: i18n.language,
    isRTL: RTL_LANGUAGES.includes(i18n.language),
    toggleLanguage,
  }
}
