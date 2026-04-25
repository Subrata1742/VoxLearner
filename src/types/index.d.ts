interface SavedMessage {
    role: "user" | "system" | "assistant";
    content: string;
}
interface CreateCompanion {
    name: string;
    subject: string;
    topic: string;
    voice: string;
    style: string;
    duration: number;
}
interface GetAllCompanions {
    limit?: number;
    page?: number;
    subject?: string | string[];
    topic?: string | string[];

}
interface SearchParams {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}