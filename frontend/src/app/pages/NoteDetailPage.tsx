import { GlassCard } from "@/components/common/GlassCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import useNotesAPI from "@/hooks/useNotesAPI";
import { useEffect, useState } from "react";
import type { Note } from "@/types";

export function NoteDetailPage() {

    const navigate = useNavigate()
    const {getNoteById, updateNote, deleteNote} = useNotesAPI()

    const {id} = useParams()

    const [note, setNote] = useState<Note | null>(null)
    const [loading, setLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
 

    useEffect(() => {
        if(!id) return
        const fetchNote = async () => {
            if(!id) return
            const note = await getNoteById(id)
            if(note){
                setNote(note)
                setLoading(false)
            }
        }
        fetchNote()
    }, [getNoteById, id])

    const handleTitleChange = async (e:React.ChangeEvent<HTMLInputElement>) => {
        setNote((prev) => prev ? {...prev, title:e.target.value} : null)
        setIsSaving(true)
    }
    
    const handleContentChange = async (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setNote((prev) => prev ? {...prev, content:e.target.value} : null)
        setIsSaving(true)
    }

    const handleSaveNote = async () => {
        if(!note || !id) return
        const updatedNote = await updateNote(id, {title:note.title, content:note.content})
        if(updatedNote){
            setNote(updatedNote)
        }
        setIsSaving(false)
    }

    const handleDelete = async () => {
        if(!id || !note) return
        const result = await deleteNote(id)
        if(result){
            navigate('/')
        }
        
    }

    if(loading || !note) return <div>Loading...</div>


    return (
        <GlassCard className="p-4 flex flex-col gap-4">
            <div className="flex justify-between items-center">
            <Button variant='outline' className="cursor-pointer" onClick={()=> navigate('/')}><ArrowLeft />Back</Button>
            <Button variant='destructive' className="cursor-pointer" onClick={handleDelete}><Trash />Delete</Button>
            </div>
            <div className="flex flex-col gap-4">
                <Input
                 value={note?.title || ""}
                  className="bg-transparent dark:bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0" 
                  placeholder="Title" 
                  onChange={handleTitleChange}
                  />
                <Textarea rows={20}
                 value={note?.content || ""}
                  className="bg-transparent dark:bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 min-h-96 " 
                  placeholder="Content" 
                  onChange={handleContentChange}
                  />
            </div>
            <div className="flex justify-end">
                <Button className="cursor-pointer px-6 py-2" variant='outline' size='lg' onClick={handleSaveNote} disabled={!isSaving}>Save</Button>
            </div>
        </GlassCard>
    )

}