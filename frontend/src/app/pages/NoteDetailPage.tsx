import { GlassCard } from "@/components/common/GlassCard"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Languages, Book } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import useNotesAPI from "@/hooks/useNotesAPI"
import { useCallback, useEffect, useRef, useState } from "react"
import type { Note } from "@/types"
import { toast } from "sonner"
import { DeleteDialog } from "@/components/common/DeleteDialog"
import AutoSave from "@/components/note/AutoSave"
import useAutoSave from "@/hooks/useAutoSave"
import useAiFeaturesAPI from "@/hooks/useAiFeaturesAPI"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"

export function NoteDetailPage() {
    const navigate = useNavigate()
    const { getNoteById, deleteNote } = useNotesAPI()
    const { translateNote, summarizeNote } = useAiFeaturesAPI()
    const { id } = useParams()
    const { t } = useTranslation()

    const [note, setNote] = useState<Note | null>(null)
    const [loading, setLoading] = useState(true)

    const { saveStatus, debouncedSave, triggerSave, isSaved } = useAutoSave({
        id: id!,
        note,
        onSaved: (updated) => setNote(updated),
        delay: 800,
    })

    // ── Fetch note ────────────────────────────────────────────────────────────
    useEffect(() => {
        if (!id) return
        const fetchNote = async () => {
            const fetchedNote = await getNoteById(id)
            // Always exit loading — even if the fetch returns null
            if (fetchedNote) setNote(fetchedNote)
            setLoading(false)
        }
        fetchNote()
    }, [getNoteById, id])

    // ── Unsaved-changes warning on browser close / tab close ─────────────────
    useEffect(() => {
        const handler = (e: BeforeUnloadEvent) => {
            if (!isSaved) {
                e.preventDefault()
            }
        }
        window.addEventListener("beforeunload", handler)
        return () => window.removeEventListener("beforeunload", handler)
    }, [isSaved])

    // ── Ctrl+S / Cmd+S keyboard shortcut ─────────────────────────────────────
    const triggerSaveRef = useRef(triggerSave)
    // eslint-disable-next-line react-hooks/refs
    triggerSaveRef.current = triggerSave

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "s") {
                e.preventDefault()
                triggerSaveRef.current()
            }
        }
        window.addEventListener("keydown", handler)
        return () => window.removeEventListener("keydown", handler)
    }, [])

    // ── Handlers ──────────────────────────────────────────────────────────────
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNote((prev) => (prev ? { ...prev, title: e.target.value } : null))
        debouncedSave()
    }

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNote((prev) => (prev ? { ...prev, content: e.target.value } : null))
        debouncedSave()
    }

    const handleTranslateNote = async () => {
        if (!note) return
        const result = await translateNote({ noteId: id! })
        if (result) {
            setNote((prev) => (prev ? { ...prev, content: result.result } : null))
            debouncedSave()
            toast.success(t("noteDetail.translatedSuccess"))
        }
    }

    const handleSummerize = async () => {
        if (!note) return
        const result = await summarizeNote({ noteId: id! })
        if (result) {
            setNote((prev) => (prev ? { ...prev, content: result.result } : null))
            debouncedSave()
            toast.success(t("noteDetail.summarizedSuccess"))
        }
    }

    const handleDelete = async () => {
        if (!id || !note) return
        const result = await deleteNote(id)
        if (result) {
            navigate("/")
            toast.success(t("noteDetail.deleteSuccess"))
        } else {
            toast.error(t("noteDetail.deleteError"))
        }
    }

    // ── Navigate back with unsaved-changes guard ──────────────────────────────
    const handleBack = useCallback(() => {
        if (!isSaved) {
            const confirmed = window.confirm(t("noteDetail.unsavedPrompt"))
            if (!confirmed) return
        }
        navigate("/")
    }, [isSaved, navigate, t])

    // ── Loading state ─────────────────────────────────────────────────────────
    if (loading || !note) {
        return (
            <GlassCard className="p-8 flex items-center justify-center min-h-64">
                <span className="text-muted-foreground text-sm animate-pulse">
                    {t("noteDetail.loading")}
                </span>
            </GlassCard>
        )
    }


    return (
        <GlassCard className="flex flex-col gap-0 overflow-hidden">
            {/* ── Top toolbar ─────────────────────────────────────────────── */}
            <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-black/5">
                {/* Left: Back + AutoSave status */}
                <div className="flex items-center gap-2 min-w-0">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="cursor-pointer shrink-0"
                        onClick={handleBack}
                    >
                        <ArrowLeft className="size-4" />
                        <span className="hidden sm:inline">{t("noteDetail.back")}</span>
                    </Button>
                    <AutoSave autoSaveState={saveStatus} />
                </div>

                {/* Right: AI actions + Save + Delete */}
                <div className="flex items-center gap-2 shrink-0">
                    {/* AI buttons */}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleTranslateNote}
                        title={t("noteDetail.translate")}
                    >
                        <Languages className="size-4" />
                        <span className="hidden sm:inline">{t("noteDetail.translate")}</span>
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleSummerize}
                        title={t("noteDetail.summarize")}
                    >
                        <Book className="size-4" />
                        <span className="hidden sm:inline">{t("noteDetail.summarize")}</span>
                    </Button>

                    {/* Delete */}
                    <DeleteDialog
                        onDelete={handleDelete}
                        title={t("deleteDialog.title")}
                        description={t("deleteDialog.description")}
                        buttonText={t("deleteDialog.deleteNote")}
                    />
                </div>
            </div>

            {/* ── Title input ──────────────────────────────────────────────── */}
            <div className="px-6 pt-6 pb-2">
                <input
                    type="text"
                    value={note.title}
                    onChange={handleTitleChange}
                    placeholder={t("noteDetail.titlePlaceholder")}
                    className={cn(
                        "w-full bg-transparent border-none outline-none resize-none",
                        "text-2xl sm:text-3xl font-bold leading-tight",
                        "text-foreground placeholder:text-muted-foreground/40",
                        "focus:outline-none"
                    )}
                />
            </div>

            {/* ── Divider ──────────────────────────────────────────────────── */}
            <div className="mx-6 border-b border-black/5" />

            {/* ── Content textarea ─────────────────────────────────────────── */}
            <div className="flex-1 px-6 py-4">
                <textarea
                    value={note.content}
                    onChange={handleContentChange}
                    placeholder={t("noteDetail.contentPlaceholder")}
                    className={cn(
                        "w-full min-h-[60vh] bg-transparent border-none outline-none resize-none",
                        "text-base leading-relaxed",
                        "text-foreground placeholder:text-muted-foreground/40",
                        "focus:outline-none"
                    )}
                />
            </div>
        </GlassCard>
    )
}
