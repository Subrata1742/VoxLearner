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