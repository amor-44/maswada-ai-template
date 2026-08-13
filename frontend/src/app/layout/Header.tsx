import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { UserButton, useAuth } from "@clerk/react"
import { useTranslation } from "react-i18next"
import { useLanguage } from "@/hooks/useLanguage"

export function Header() {
  const { isSignedIn } = useAuth()
  const { t } = useTranslation()
  const { toggleLanguage } = useLanguage()

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto w-full max-w-6xl px-4 pt-4 sm:px-6 lg:px-8">
        <div className="glass-card flex items-center justify-between gap-4 rounded-2xl px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-sm font-semibold tracking-wide">
              {t("header.brand")}
            </Link>
            <span className="hidden text-xs text-muted-foreground sm:inline">
              {t("header.tagline")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-md"
              onClick={toggleLanguage}
              aria-label="Toggle language"
            >
              {t("header.langToggle")}
            </Button>
            {isSignedIn ? (
              <UserButton />
            ) : (
              <Link to="/sign-in">
                <Button size="sm" className="rounded-md">
                  {t("header.signIn")}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
