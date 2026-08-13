import { useTranslation } from "react-i18next"

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="mt-8 border-t border-black/5">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-6 text-xs text-zinc-500 sm:px-6 lg:px-8">
        <span>© {new Date().getFullYear()} {t("header.brand")}</span>
        <span className="hidden sm:inline">{t("footer.rights")}</span>
      </div>
    </footer>
  )
}
