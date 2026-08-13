import { GlassCard } from "@/components/common/GlassCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import useNotesAPI from "@/hooks/useNotesAPI";
import { useEffect, useState } from "react";
import type { Note } from "@/types";
import { toast } from "sonner";
import { DeleteDialog } from "@/components/common/DeleteDialog";
import AutoSave from "@/components/note/AutoSave";
import useAutoSave from "@/hooks/useAutoSave";

export function NoteDetailPage() {
    const navigate = useNavigate();
    const { getNoteById, deleteNote } = useNotesAPI();
    const { id } = useParams();

    const [note, setNote] = useState<Note | null>(null);
    const [loading, setLoading] = useState(true);

    const { saveStatus, debouncedSave } = useAutoSave({
        id: id!,
        note,
        onSaved: (updated) => setNote(updated),
    });

    useEffect(() => {
        if (!id) return;
        const fetchNote = async () => {
            const fetchedNote = await getNoteById(id);
            if (fetchedNote) {
                setNote(fetchedNote);
                setLoading(false);
            }
        };
        fetchNote();
    }, [getNoteById, id]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNote((prev) => (prev ? { ...prev, title: e.target.value } : null));
        debouncedSave();
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNote((prev) => (prev ? { ...prev, content: e.target.value } : null));
        debouncedSave();
    };

    const handleDelete = async () => {
        if (!id || !note) return;
        const result = await deleteNote(id);
        if (result) {
            navigate("/");
            toast.success("Note deleted successfully");
        } else {
            toast.error("Failed to delete note");
        }
    };

    if (loading || !note) return <div>Loading...</div>;

    return (
        <GlassCard className="p-4 flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="cursor-pointer" onClick={() => navigate("/")}>
                        <ArrowLeft />Back
                    </Button>
                    <AutoSave autoSaveState={saveStatus} />
                </div>
                <DeleteDialog
                    onDelete={handleDelete}
                    title="Delete note?"
                    description="This will permanently delete this note."
                    buttonText="Delete Note?"
                />
            </div>
            <div className="flex flex-col gap-4">
                <Input
                    value={note.title || ""}
                    className="bg-transparent dark:bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Title"
                    onChange={handleTitleChange}
                />
                <Textarea
                    rows={20}
                    value={note.content || ""}
                    className="bg-transparent dark:bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 min-h-96"
                    placeholder="Content"
                    onChange={handleContentChange}
                />
            </div>
        </GlassCard>
    );
}