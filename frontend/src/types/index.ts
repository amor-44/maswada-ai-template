export type Note = {
    id: number;
    title: string;
    userId: string;
    content: string;
    summary: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export type CreateNoteData = {
    title: string
    content: string
}

export type UpdatedNoteData = {
    title?: string
    content?: string
}