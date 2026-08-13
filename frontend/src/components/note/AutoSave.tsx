import type { AutoSaveState } from "@/types"
import { CircleAlertIcon, CircleCheckIcon, CircleDashedIcon } from "lucide-react"
import { useTranslation } from "react-i18next"

type Props = {
  autoSaveState: AutoSaveState
}

function AutoSave({ autoSaveState }: Props) {
  const { t } = useTranslation()

  switch (autoSaveState) {
    case "saving":
      return (
        <div className="flex items-center gap-2">
          <CircleDashedIcon className="text-xs text-zinc-500 animate-spin" />
          <span className="text-xs text-zinc-500">{t("autoSave.saving")}</span>
        </div>
      )
    case "saved":
      return (
        <div className="flex items-center gap-2">
          <CircleCheckIcon className="text-xs text-green-500" />
          <span className="text-xs text-green-500">{t("autoSave.saved")}</span>
        </div>
      )
    case "unsaved":
      return (
        <div className="flex items-center gap-2">
          <CircleAlertIcon className="text-xs text-orange-500" />
          <span className="text-xs text-orange-500">{t("autoSave.unsaved")}</span>
        </div>
      )
    case "initial":
    default:
      return null
  }
}

export default AutoSave