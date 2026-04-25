type Message =
    | TranscriptMessage
    | FunctionCallMessage
    | FunctionCallResultMessage;


interface AgentProps {
    id: string;
    subject: string;
    topic: string;
    voice: string;
    style: string;
    duration: number
}