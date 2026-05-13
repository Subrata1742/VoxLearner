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
        const { userId: author } = await auth();
        if (!author) {
            return;
        }
        const skip = (page - 1) * limit;

        const where: any = { userId: author };

        if (subject && topic) {

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
                createdAt: 'desc'
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
            messages: [...conversations].reverse(),
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
            createdAt: 'desc'
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
    if (!userId) {
        return
    }

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



export const getRescentSessions = async (limit = 9) => {
    const { userId: author } = await auth();

    if (!author) {
        return;
    }

    try {
        const recentConversations = await prisma.conversation.findMany({
            where: {
                companion: {
                    userId: author
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
            distinct: ['companionId'],
            take: limit,
            include: {
                companion: true
            }
        });

        return recentConversations.map(conv => conv.companion);
    } catch (error: any) {
        console.error("Error fetching recent companions:", error);
        return;
    }
}



export const getUserDashboardMetrics = async () => {
    const { userId, has } = await auth();
    if (!userId) return null;

    let planName = "Free";
    if (has({ plan: 'premium' })) planName = "Premium";
    else if (has({ plan: 'pro' })) planName = "Pro";

    let companionLimit = 1;
    if (has({ plan: 'premium' })) companionLimit = 999;
    else if (has({ feature: "10_active_companion" })) companionLimit = 10;
    else if (has({ feature: "3_active_companion" })) companionLimit = 3;

    let conversationLimit = 3;
    if (has({ plan: 'premium' }) || has({ plan: 'pro' })) conversationLimit = 999; // Unlimited
    else if (has({ feature: "10_conversation_month" })) conversationLimit = 10;

    const companionCount = await prisma.companion.count({
        where: { userId }
    });

    const monthlyConversations = await prisma.conversation.count({
        where: {
            companion: { userId },
            createdAt: {
                gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
            }
        }
    });
    return {
        planName,
        usage: {
            companions: { current: companionCount, limit: companionLimit },
            conversations: { current: monthlyConversations, limit: conversationLimit }
        }
    };
};



export const getHistoryByCompanionId = async (companionId: string) => {
    const { userId } = await auth();
    if (!userId) return null;

    try {
        const companion = await prisma.companion.findUnique({
            where: {
                id: companionId,
                userId: userId
            }
        });

        if (!companion) return null;

        const conversations = await prisma.conversation.findMany({
            where: { companionId: companionId },
            orderBy: { createdAt: 'desc' }
        });

        return { companion, conversations };
    } catch (error) {
        console.error("Error fetching companion history:", error);
        return null;
    }
};

export const hasPremiumPlan = async () => {
    const { userId, has } = await auth();
    if (!userId) return;
    return has({ plan: 'premium' });
}
export const hasProPlan = async () => {
    const { userId, has } = await auth();
    if (!userId) return;
    return has({ plan: 'pro' });
}