"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";

export const generateProgressReport = async () => {
    const { userId } = await auth();
    if (!userId) return null;

    try {
        // 1. get all conversations
        const conversations = await prisma.conversation.findMany({
            where: { companion: { userId } },
            include: { companion: true },
        });

        if (conversations.length === 0) {
            return { error: "Not enough data yet. Start some conversations!" };
        }


        const transcriptLog = conversations.map(c => {
            const messages = Array.isArray(c.messages) ? c.messages : [];
            const dialogue = messages.map((m: any) => `${m.role}: ${m.message || m.content}`).join('\n');
            return `Topic: ${c.companion.topic}\nSubject: ${c.companion.subject}\nDialogue:\n${dialogue}\n---`;
        }).join('\n\n');


        const { object } = await generateObject({
            model: google("gemini-2.5-flash"),
            system: "You are an expert AI educational evaluator. Analyze the provided student transcripts. Determine their mastery of the topics discussed. Score them from 0 to 100 based on their comprehension, accuracy, and depth of conversation. Return a strict JSON object.",
            prompt: `Analyze the following transcripts and generate a progress report:\n\n${transcriptLog}`,
            schema: z.object({
                overallSummary: z.string().describe("A 2-sentence encouraging summary of the user's overall learning progress."),
                topics: z.array(z.object({
                    name: z.string().describe("The name of the subject or topic (e.g., Next.js, React, Physics)"),
                    score: z.number().describe("Mastery score from 0 to 100"),
                    feedback: z.string().describe("One sentence of specific, actionable feedback or praise based on the transcript.")
                })).max(6)
            })
        });

        return { success: true, data: object };

    } catch (error) {
        console.error("AI Progress Generation Error:", error);
        return { error: "Failed to generate AI report. Make sure your API key is configured." };
    }
};