import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Bot, MessageSquare, CreditCard, Activity, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import CompanionCard from '../homePage/companionCard';



const InfoCard = ({ metrics, recentCompanions }: { metrics: any, recentCompanions: any }) => {
    const getProgress = (current: number, limit: number) => {
        if (limit === 999) return 100;
        return Math.min(Math.round((current / limit) * 100), 100);
    };
    return (
        <>{metrics && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Plan Card */}
                <Card className="dashboard-card ">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-lg font-bold flex items-center gap-2">
                            <div className="p-2 rounded-full bg-[#e94560]/10 text-[#e94560]"><CreditCard size={20} /></div>
                            Subscription
                        </CardTitle>
                        <span className="text-xs font-bold uppercase tracking-wider bg-[#e94560]/20 text-[#e94560] px-3 py-1 rounded-full">
                            {metrics.planName}
                        </span>
                    </CardHeader>
                    <CardContent>
                        <CardDescription className="text-white/60 mb-6">Manage your plan and billing details.</CardDescription>
                        <Link href="/subscription" className="text-[#e94560] font-semibold flex items-center gap-2 hover:gap-3 transition-all text-sm uppercase">
                            Upgrade Plan <ArrowRight size={16} />
                        </Link>
                    </CardContent>
                </Card>

                {/* Companions Usage */}
                <Card className="dashboard-card">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-bold flex items-center gap-2">
                            <div className="p-2 rounded-full bg-blue-500/10 text-blue-400"><Bot size={20} /></div>
                            Active Companions
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold mb-2">
                            {metrics.usage.companions.current} <span className="text-sm text-white/50 font-normal">/ {metrics.usage.companions.limit === 999 ? 'Unlimited' : metrics.usage.companions.limit}</span>
                        </div>
                        <Progress value={getProgress(metrics.usage.companions.current, metrics.usage.companions.limit)} className="h-2 bg-[#1a1a2e]" indicatorColor="bg-blue-500" />
                    </CardContent>
                </Card>

                {/* Conversations Usage */}
                <Card className="dashboard-card">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-bold flex items-center gap-2">
                            <div className="p-2 rounded-full bg-purple-500/10 text-purple-400"><MessageSquare size={20} /></div>
                            Monthly Sessions
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold mb-2">
                            {metrics.usage.conversations.current} <span className="text-sm text-white/50 font-normal">/ {metrics.usage.conversations.limit === 999 ? 'Unlimited' : metrics.usage.conversations.limit}</span>
                        </div>
                        <Progress value={getProgress(metrics.usage.conversations.current, metrics.usage.conversations.limit)} className="h-2 bg-[#1a1a2e]" indicatorColor="bg-purple-500" />
                    </CardContent>
                </Card>
            </div>
        )}

            {/* Recent Activity */}
            <section>
                <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                    <Activity size={24} className="text-[#e94560]" /> Resume Learning
                </h2>
                {!recentCompanions || recentCompanions.length === 0 ? (
                    <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10 text-white/50">
                        No recent activity. Start a voice session to see it here.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {recentCompanions.slice(0, 3).map((companion: any) => (
                            <Link href={`/companion/${companion.id}`} key={`dash-${companion.id}`} className="no-underline">
                                <CompanionCard companion={companion} />
                            </Link>
                        ))}
                    </div>
                )}
            </section></>
    )
}

export default InfoCard