import { useCallback, useRef, useState } from "react"
import { toast } from "sonner"
import type { AutoSaveState, Note } from "@/types"
import useNotesAPI from "@/hooks/useNotesAPI"

interface UseAutoSaveProps {
    id: string
    note: Note | null
    onSaved: (updated: Note) => void
    delay?: number
}

function useAutoSave({ id, note, onSaved, delay = 2000 }: UseAutoSaveProps) {
    const { updateNote } = useNotesAPI()

    const [saveStatus, setSaveStatus] = useState<AutoSaveState>("initial")

    // Always holds the latest note — avoids stale closure in the debounce timeout
    const noteRef = useRef<Note | null>(null)
    // eslint-disable-next-line react-hooks/refs
    noteRef.current = note

    const timeoutRef = useRef<number | null>(null)

    const save = useCallback(async () => {
        const current = noteRef.current
        if (!current) return

        setSaveStatus("saving")
        try {
            const updated = await updateNote(id, {
                title: current.title,
                content: current.content,
            })
            if (updated) {
                onSaved(updated)
                setSaveStatus("saved")
            } else {
                setSaveStatus("unsaved")
                toast.error("Failed to save changes")
            }
        } catch {
            setSaveStatus("unsaved")
            toast.error("Failed to save changes")
        }
    }, [id, updateNote, onSaved])

    const debouncedSave = useCallback(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        setSaveStatus("unsaved")
        timeoutRef.current = window.setTimeout(() => {
            save()
        }, delay)
    }, [save, delay])

    return { saveStatus, debouncedSave }
}

export default useAutoSave
