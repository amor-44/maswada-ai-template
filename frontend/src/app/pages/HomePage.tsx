import { GlassCard } from "@/components/common/GlassCard"
import { Button } from "@/components/ui/button"
import { Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import useNotesAPI from "@/hooks/useNotesAPI"
import type { Note } from "@/types"
import { useNavigate } from "react-router-dom"




export function HomePage() {
  const {getAllNotes,createNote} = useNotesAPI()
  const [notes, setNotes] = useState<Note[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchNotes = async () => {
      const result = await getAllNotes()
      setNotes(result ?? [])
    }
    fetchNotes()
  }, [getAllNotes])

  const handleCreateNote = async () => {

      const note = await createNote({
        title: "New Note",
        content: "This is a new note"
      })
      if(note){
        navigate(`/notes/${note.id}`)
      }

  }

  const handleNoteClick = (noteId:number)=>{
    navigate(`/notes/${noteId}`)
  }

  return (
    <div className="space-y-12">
      <GlassCard className="px-4 py-6 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">My Notes</h1>
          <Button onClick={handleCreateNote}><Plus />Create Note</Button>
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-1.5 text-muted-foreground w-4" />
          <Input placeholder="Search notes..." className="pl-7" />
        </div>
        <div className="flex flex-col gap-4">
          {notes.map((note) => (
            <GlassCard onClick={()=>handleNoteClick(note.id)} key={note.id} className="p-4 cursor-pointer">
              <h2 className="text-lg font-bold">{note.title}</h2>
            </GlassCard>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}
