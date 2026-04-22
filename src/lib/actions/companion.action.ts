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


export const getAllCompanions = async () => {
    const { userId: author } = await auth();
    if (!author) {
        return
    }
    return prisma.companion.findMany({
        where: {
            userId: author,
        },
        orderBy: {
            updatedAt: "desc",
        },
    });
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