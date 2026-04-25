import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';
import { ArrowRight, Bot, History } from 'lucide-react';

const HistoryCard = ({ recentCompanions }: { recentCompanions: any }) => {

    return (
        <Card className="dashboard-card">
            <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2"><History className="text-blue-400" /> Session History</CardTitle>
                <CardDescription className="text-white/60">Select a companion to view your complete conversation transcripts.</CardDescription>
            </CardHeader>
            <CardContent>
                {!recentCompanions || recentCompanions.length === 0 ? (
                    <div className="text-center py-16 text-white/50">
                        <History size={40} className="mx-auto mb-4 text-blue-400/50" />
                        <p className="text-lg">No session history found.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        {recentCompanions.map((companion: any) => (
                            <Link
                                href={`/dashboard/${companion.id}`}
                                key={companion.id}
                                className="block no-underline"
                            >
                                <div className="flex items-center justify-between p-4 bg-black/20 hover:bg-white/10 border border-white/10 rounded-xl transition-all cursor-pointer group h-full">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-full bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform duration-300">
                                            <Bot size={24} />
                                        </div>
                                        <div>
                                            <div className="font-bold text-white text-lg group-hover:text-blue-400 transition-colors">
                                                {companion.name}
                                            </div>
                                            <div className="text-sm text-white/50 truncate max-w-[150px] md:max-w-[200px]">
                                                {companion.subject} • {companion.topic}
                                            </div>
                                        </div>
                                    </div>
                                    <ArrowRight size={20} className="text-white/20 group-hover:text-blue-400 group-hover:-translate-x-1 transition-all" />
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default HistoryCard