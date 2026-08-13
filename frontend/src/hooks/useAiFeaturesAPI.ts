/**
 * useAiFeaturesAPI
 *
 * Hook that exposes AI feature functions (translate, summarize, rewrite).
 *
 * PUBLIC-DEMO MODE (VITE_AI_ENABLED=false):
 *   Every function returns null immediately after showing a friendly toast.
 *   No network request is ever sent to the backend.
 *
 * TO RE-ENABLE:
 *   Set VITE_AI_ENABLED=true in frontend/.env and restart the dev server.
 */

import { useAuth } from "@clerk/react"
import { toast } from "sonner"
import type { TranslateInput, TranslateOutput } from "@/types"
import { API_BASE_URL } from "@/lib/utils"
import { features } from "@/config/features"
import { useTranslation } from "react-i18next"

function useAiFeaturesAPI() {
  const { getToken } = useAuth()
  const { t } = useTranslation()

  // ── Translate ──────────────────────────────────────────────────────────────
  const translateNote = async (
    note: TranslateInput
  ): Promise<TranslateOutput | null> => {
    if (!features.aiEnabled) {
      toast.info(t("ai.disabledMessage"), { duration: 6000 })
      return null
    }

    try {
      const token = await getToken()
      if (!token) return null

      const res = await fetch(API_BASE_URL + "/api/ai/translate", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      })

      if (!res.ok) {
        toast.error(t("errors.translateFailed"))
        return null
      }

      const data: { result: TranslateOutput } = await res.json()
      return data.result
    } catch {
      toast.error(t("errors.translateFailed"))
      return null
    }
  }

  // ── Summarize ─────────────────────────────────────────────────────────────
  const summarizeNote = async (
    input: TranslateInput
  ): Promise<TranslateOutput | null> => {
    if (!features.aiEnabled) {
      toast.info(t("ai.disabledMessage"), { duration: 6000 })
      return null
    }

    try {
      const token = await getToken()
      if (!token) return null

      const res = await fetch(API_BASE_URL + "/api/ai/summarize", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      })

      if (!res.ok) {
        toast.error(t("errors.summarizeFailed"))
        return null
      }

      const data: { result: TranslateOutput } = await res.json()
      return data.result
    } catch {
      toast.error(t("errors.summarizeFailed"))
      return null
    }
  }

  // ── Rewrite ───────────────────────────────────────────────────────────────
  const rewriteNote = async (
    input: TranslateInput & { mode: "comedy" | "formal" | "casual" }
  ): Promise<TranslateOutput | null> => {
    if (!features.aiEnabled) {
      toast.info(t("ai.disabledMessage"), { duration: 6000 })
      return null
    }

    try {
      const token = await getToken()
      if (!token) return null

      const res = await fetch(API_BASE_URL + "/api/ai/rewrite", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      })

      if (!res.ok) {
        toast.error(t("errors.rewriteFailed"))
        return null
      }

      const data: { result: TranslateOutput } = await res.json()
      return data.result
    } catch {
      toast.error(t("errors.rewriteFailed"))
      return null
    }
  }

  return { translateNote, summarizeNote, rewriteNote }
}

export default useAiFeaturesAPI