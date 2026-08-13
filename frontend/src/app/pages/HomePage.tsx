import { GlassCard } from "@/components/common/GlassCard"
import { Button } from "@/components/ui/button"
import { Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import useNotesAPI from "@/hooks/useNotesAPI"
import type { Note } from "@/types"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@clerk/react"
import { useTranslation } from "react-i18next"

export function HomePage() {
  const { isLoaded, isSignedIn } = useAuth()
  const { getAllNotes, createNote } = useNotesAPI()
  const [notes, setNotes] = useState<Note[]>([])
  const navigate = useNavigate()
  const { t } = useTranslation()

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate("/sign-in")
    }
  }, [isLoaded, isSignedIn, navigate])

  useEffect(() => {
    if (!isSignedIn) return
    const fetchNotes = async () => {
      try {
        const result = await getAllNotes()
        setNotes(result ?? [])
      } catch {
        setNotes([])
      }
    }
    fetchNotes()
  }, [getAllNotes, isSignedIn])

  const handleCreateNote = async () => {
    // Backend requires title.length >= 1; use a minimal default that the
    // editor's placeholder will visually replace for the user.
    const note = await createNote({
      title: t("noteDetail.titlePlaceholder"),
      content: "",
    })
    if (note) {
      navigate(`/notes/${note.id}`)
    }
  }

  const handleNoteClick = (noteId: number) => {
    navigate(`/notes/${noteId}`)
  }

  return (
    <div className="space-y-12">
      <GlassCard className="px-4 py-6 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">{t("home.title")}</h1>
          <Button onClick={handleCreateNote}>
            <Plus />
            {t("home.createNote")}
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute start-2 top-1.5 text-muted-foreground w-4" />
          <Input placeholder={t("home.searchPlaceholder")} className="ps-7" />
        </div>
        <div className="flex flex-col gap-4">
          {notes.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              {t("home.emptyState")}
            </p>
          ) : (
            notes.map((note) => (
              <GlassCard
                onClick={() => handleNoteClick(note.id)}
                key={note.id}
                className="p-4 cursor-pointer"
              >
                <h2 className="text-lg font-bold">{note.title}</h2>
              </GlassCard>
            ))
          )}
        </div>
      </GlassCard>
    </div>
  )
}
