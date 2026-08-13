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

export type AutoSaveState = "initial" | "saved" | "saving" | "unsaved";



export type TranslateInput ={
    noteId?: string;
    text?:string;
}

export type TranslateOutput ={
    result: string;
}

export type SummarizeInput = {
    noteId?: string;
    text?:string;
}

