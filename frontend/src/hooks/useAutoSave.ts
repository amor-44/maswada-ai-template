import { useCallback, useRef, useState } from "react"
import { toast } from "sonner"
import { useTranslation } from "react-i18next"
import type { AutoSaveState, Note } from "@/types"
import useNotesAPI from "@/hooks/useNotesAPI"

interface UseAutoSaveProps {
  id: string
  note: Note | null
  onSaved: (updated: Note) => void
  /** Debounce delay in ms. Default 800ms. */
  delay?: number
}

function useAutoSave({ id, note, onSaved, delay = 800 }: UseAutoSaveProps) {
  const { updateNote } = useNotesAPI()
  const { t } = useTranslation()

  const [saveStatus, setSaveStatus] = useState<AutoSaveState>("initial")

  // Always holds the latest note to avoid stale closure in the debounce timeout
  const noteRef = useRef<Note | null>(null)
  // eslint-disable-next-line react-hooks/refs
  noteRef.current = note

  const timeoutRef = useRef<number | null>(null)

  /** Core save function — can be called directly (Ctrl+S) or via debounce */
  const save = useCallback(async (): Promise<boolean> => {
    const current = noteRef.current
    if (!current) return false

    // Cancel any pending debounce so we don't double-save
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    setSaveStatus("saving")
    try {
      const updated = await updateNote(id, {
        title: current.title,
        content: current.content,
      })
      if (updated) {
        onSaved(updated)
        setSaveStatus("saved")
        return true
      } else {
        setSaveStatus("unsaved")
        toast.error(t("errors.saveFailed"))
        return false
      }
    } catch {
      setSaveStatus("unsaved")
      toast.error(t("errors.saveFailed"))
      return false
    }
  }, [id, updateNote, onSaved, t])

  /** Debounced save — resets the timer on every call */
  const debouncedSave = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setSaveStatus("unsaved")
    timeoutRef.current = window.setTimeout(() => {
      save()
    }, delay)
  }, [save, delay])

  const isSaved = saveStatus === "saved" || saveStatus === "initial"

  return { saveStatus, debouncedSave, triggerSave: save, isSaved }
}

export default useAutoSave
