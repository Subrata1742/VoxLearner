"use server"
import prisma from "@/lib/prisma";

import { auth } from "@clerk/nextjs/server";



export const createCompanion = async (formData: CreateCompanion) => {
    const { userId: author } = await auth();

    if (!author) {
        throw new Error("Unauthorized");
    }
    return prisma.companion.create({
        data: {
            userId: author,
            name: formData.name,
            topic: formData.topic,
            subject: formData.subject,
            voice: formData.voice,
            style: formData.style,
            duration: formData.duration,
        },
    });
};


export const getAllCompanions = async ({ limit = 10, page = 1, subject, topic }: GetAllCompanions = {}) => {
    try {
        const skip = (page - 1) * limit;

        // Build the "where" filter dynamically
        const where: any = {};

        if (subject && topic) {
            // Both filters: Subject must match AND (Topic OR Name must match)
            where.AND = [
                { subject: { contains: subject, mode: 'insensitive' } },
                {
                    OR: [
                        { topic: { contains: topic, mode: 'insensitive' } },
                        { name: { contains: topic, mode: 'insensitive' } }
                    ]
                }
            ];
        } else if (subject) {
            where.subject = { contains: subject, mode: 'insensitive' };
        } else if (topic) {
            // Search for topic in both 'topic' and 'name' fields
            where.OR = [
                { topic: { contains: topic, mode: 'insensitive' } },
                { name: { contains: topic, mode: 'insensitive' } }
            ];
        }

        const companions = await prisma.companion.findMany({
            where,
            skip,
            take: limit,
            orderBy: {
                createdAt: 'desc' // Optional: Good practice for lists
            }
        });

        return companions;
    } catch (error: any) {
        console.error("Error fetching companions:", error);
        throw new Error(error.message || "Failed to fetch companions");
    }
};

export const getCompanionById = async (id: string) => {
    const { userId: author } = await auth();
    if (!author) {
        throw new Error("Unauthorized");
    }
    return prisma.companion.findUnique({
        where: {
            id,
            userId: author,
        },
    });
};

export const updateConversations = async (id: string, conversations: any[]) => {
    const { userId: author } = await auth();
    if (!author) {
        throw new Error("Unauthorized");
    }
    return prisma.conversation.create({
        data: {
            companionId: id,
            messages: [...conversations].reverse(), // Store all messages chronologically
        },
    });
};

export const getConversationsByCompanionId = async (id: string) => {
    const { userId: author } = await auth();
    if (!author) {
        return
    }
    return prisma.conversation.findMany({
        where: {
            companionId: id,
        },
        take: 3,
        orderBy: {
            createdAt: 'desc' // Optional: Good practice for lists
        }
    });
};

export const conversationCount = async () => {
    const { userId: author } = await auth();
    if (!author) {
        return
    }
    return await prisma.conversation.count({
        where: {
            companion: {
                userId: author
            }
        }
    });
}

export const newCompanionPermissions = async () => {
    const { userId, has } = await auth();


    let limit = 0;

    if (has({ plan: 'premium' })) {
        return true;
    } else if (has({ feature: "3_active_companion" })) {
        limit = 3;
    } else if (has({ feature: "10_active_companion" })) {
        limit = 10;
    }

    const companionCount = await prisma.companion.count({
        where: {
            userId: userId!,
        },
    });

    if (companionCount >= limit) {
        return false
    } else {
        return true;
    }
}

export const newSessionPermissions = async (id: string) => {
    const { userId, has } = await auth();
    if (!userId) {
        return
    }

    let limit = 0;

    if (has({ plan: 'premium' }) || has({ plan: 'pro' })) {
        return true;
    } else if (has({ feature: "10_conversation_month" })) {
        limit = 10;
    }

    const conversationCount = await prisma.conversation.count({
        where: {

            companion: {
                userId: userId!,
            },

            companionId: id,
            createdAt: {
                gte: new Date(
                    new Date().getFullYear(),
                    new Date().getMonth(),
                    1
                )
            }
        },
    });

    if (conversationCount >= limit) {
        return false
    } else {
        return true;
    }
}