// src/app/dashboard/[id]/page.tsx

import { getHistoryByCompanionId, hasPremiumPlan, hasProPlan } from '@/lib/actions/companion.action';
import { ArrowLeft, Bot, Calendar, MessageSquareText, History } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default async function CompanionTranscriptPage({
    params,
}: {
    params: Promise<{ id: string }> | { id: string };
}) {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const hasPro = await hasProPlan();
    const hasPremium = await hasPremiumPlan();

    const data = hasPro || hasPremium ? await getHistoryByCompanionId(id) : null;

    if (!hasPro && !hasPremium) {
        return (
            <div className=" flex z-1 justify-center items-center h-screen">
                <div className="empty-state text-center space-y-4">
                    <History size={48} className="mx-auto text-white/20" />
                    <h2 className="text-2xl text-white">History Not Available</h2>
                    <p className="text-white/60">Please upgrade to a Pro or Premium plan to view your transcripts.</p>
                    <Link href="/subscription" className="create-btn mt-4 inline-block">
                        Upgrade
                    </Link>
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className=" flex z-1 justify-center items-center h-screen">
                <div className="empty-state text-center space-y-4">
                    <History size={48} className="mx-auto text-white/20" />
                    <h2 className="text-2xl text-white">History Not Found</h2>
                    <p className="text-white/60">We couldn't find the transcripts you're looking for.</p>
                    <Link href="/dashboard?tab=history" className="create-btn mt-4 inline-block">
                        Return to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    const { companion, conversations } = data;

    return (
        <main className="content-wrapper max-w-4xl mx-auto">

            {/* Header Section */}
            <div className="flex items-center gap-4 mb-8">
                <Link href="/dashboard?tab=history">
                    <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors text-white">
                        <ArrowLeft size={20} />
                    </button>
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-white to-[#e94560] m-0">
                        {companion.name} Transcripts
                    </h1>
                    <p className="text-white/60 text-sm mt-1">
                        {companion.subject} • {companion.topic}
                    </p>
                </div>
            </div>

            {/* Transcripts List */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl">
                {!conversations || conversations.length === 0 ? (
                    <div className="text-center py-16 text-white/50">
                        <MessageSquareText size={48} className="mx-auto mb-4 text-[#e94560]/30" />
                        <h3 className="text-xl text-white mb-2">No conversations yet</h3>
                        <p className="max-w-md mx-auto">Start a voice call with {companion.name} to see your transcripts appear here.</p>
                    </div>
                ) : (
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {conversations.map((session: any) => (
                            <AccordionItem
                                value={session.id}
                                key={session.id}
                                className="bg-black/30 border border-white/5 rounded-2xl px-2 md:px-6 overflow-hidden data-[state=open]:bg-black/40 data-[state=open]:border-white/10 transition-all"
                            >
                                <AccordionTrigger className="hover:no-underline py-5 group">
                                    <div className="flex items-center gap-4 text-left">
                                        <div className="p-3 rounded-full bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
                                            <Calendar size={20} />
                                        </div>
                                        <div>
                                            <div className="font-bold text-white text-lg">
                                                Session on {new Date(session.createdAt).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                                            </div>
                                            <div className="text-sm text-white/40 font-mono mt-0.5">
                                                {new Date(session.createdAt).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>
                                    </div>
                                </AccordionTrigger>

                                <AccordionContent className="pt-6 pb-8 border-t border-white/5 mt-2 space-y-6">
                                    {Array.isArray(session.messages) && session.messages.length > 0 ? (
                                        session.messages.map((msg: any, i: number) => {
                                            const role = msg.role?.toLowerCase() || 'unknown';
                                            const content = msg.message || msg.content || String(msg);
                                            const isUser = role === 'user';

                                            return (
                                                <div key={i} className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
                                                    <div className={`flex gap-3 max-w-[90%] md:max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>


                                                        <div className="shrink-0 mt-1">
                                                            {isUser ? (
                                                                <div className="w-8 h-8 rounded-full bg-[#e94560]/20 flex items-center justify-center border border-[#e94560]/40 text-[#e94560]">
                                                                    <span className="text-xs font-bold">You</span>
                                                                </div>
                                                            ) : (
                                                                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/40 text-blue-400">
                                                                    <Bot size={16} />
                                                                </div>
                                                            )}
                                                        </div>


                                                        <div className={`p-4 rounded-2xl shadow-sm ${isUser
                                                            ? 'bg-linear-to-br from-[#e94560]/20 to-[#e94560]/10 text-white rounded-tr-none border border-[#e94560]/20'
                                                            : 'bg-white/5 text-white/90 rounded-tl-none border border-white/10'
                                                            }`}>
                                                            <div className="leading-relaxed text-[15px] whitespace-pre-wrap">
                                                                {content}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className="text-center text-white/40 italic text-sm py-4">
                                            No transcript data recorded for this session.
                                        </div>
                                    )}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                )}
            </div>
        </main>
    );
}