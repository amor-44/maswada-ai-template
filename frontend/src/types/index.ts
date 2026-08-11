export type Note = {
    id: number;
    title: string;
    userId: string;
    content: string;
    summary: string | null;
    createdAt: Date;
    updatedAt: Date;
}