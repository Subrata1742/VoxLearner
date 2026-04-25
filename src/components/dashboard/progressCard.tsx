import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, History, Zap } from 'lucide-react';
import Link from 'next/link';


const ProgressCard = ({ progressReport, hasPremium }: { progressReport: any, hasPremium: any }) => {

    if (!hasPremium) {
        return (
            <Card className="dashboard-card">
                <CardHeader className="relative z-10 border-b border-white/10 pb-6 mb-6">
                    <CardTitle className="text-2xl flex items-center gap-2"><LineChart className="text-purple-400" /> AI Learning Analysis</CardTitle>
                    <CardDescription className="text-white/60">Gemini AI has analyzed your transcripts to calculate your topic mastery.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="empty-state text-center space-y-4">
                        <History size={48} className="mx-auto text-white/20" />
                        <h2 className="text-2xl text-white">Feature Not Available</h2>
                        <p className="text-white/60">Please upgrade to a  Premium plan to view your progress reports.</p>
                        <Link href="/subscription" className="create-btn mt-4 inline-block">
                            Upgrade
                        </Link>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="dashboard-card">
            <CardHeader className="relative z-10 border-b border-white/10 pb-6 mb-6">
                <CardTitle className="text-2xl flex items-center gap-2"><LineChart className="text-purple-400" /> AI Learning Analysis</CardTitle>
                <CardDescription className="text-white/60">Gemini AI has analyzed your transcripts to calculate your topic mastery.</CardDescription>
            </CardHeader>
            <CardContent>

                {!progressReport ? (
                    <div className="text-center py-16 text-white/50">Loading AI analysis...</div>
                ) : progressReport.error ? (
                    <div className="text-center py-16 text-[#e94560]/80">
                        <Zap size={40} className="mx-auto mb-4 opacity-50" />
                        <p>{progressReport.error}</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-10">

                        <div className="bg-[#e94560]/10 border border-[#e94560]/20 rounded-2xl p-6 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-[#e94560]"></div>
                            <h3 className="text-[#e94560] font-bold mb-2 flex items-center gap-2">
                                <Bot size={18} /> Executive Summary
                            </h3>
                            <p className="text-white/80 leading-relaxed text-lg">
                                {progressReport.data.overallSummary}
                            </p>
                        </div>


                        <div className="h-[350px] w-full mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={progressReport.data.topics} margin={{ top: 20, right: 20, left: -20, bottom: 10 }}>

                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />

                                    <XAxis
                                        dataKey="name"
                                        stroke="rgba(255,255,255,0.3)"
                                        tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
                                        tickLine={false}
                                        axisLine={false}
                                        dy={10}
                                    />
                                    <YAxis
                                        stroke="rgba(255,255,255,0.3)"
                                        tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
                                        tickLine={false}
                                        axisLine={false}
                                        domain={[0, 100]}
                                    />
                                    <Tooltip
                                        cursor={{ stroke: 'rgba(233,69,96,0.2)', strokeWidth: 2, strokeDasharray: '5 5' }}
                                        content={({ active, payload }) => {
                                            if (active && payload && payload.length) {
                                                return (
                                                    <div className="bg-[#0f3460]/95 backdrop-blur-xl border border-[#e94560]/30 p-4 rounded-xl shadow-[0_10px_30px_rgba(233,69,96,0.2)]">
                                                        <p className="font-bold text-white mb-1">{payload[0].payload.name}</p>
                                                        <p className="text-[#e94560] font-black text-2xl">{payload[0].value}% <span className="text-sm text-white/60 font-medium">Mastery</span></p>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="score"
                                        stroke="#e94560"
                                        strokeWidth={4}
                                        dot={{ r: 6, fill: "#0f3460", stroke: "#e94560", strokeWidth: 3 }}
                                        activeDot={{ r: 8, fill: "#e94560", stroke: "#fff", strokeWidth: 2 }}
                                        animationDuration={1500}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>


                        <div>
                            <h3 className="text-xl font-bold text-white mb-4">Topic Breakdown</h3>
                            <div className="grid gap-4 md:grid-cols-2">
                                {progressReport.data.topics.map((topic: any, i: number) => (
                                    <div key={i} className="bg-black/20 border border-white/5 p-5 rounded-xl">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-bold text-white">{topic.name}</span>
                                            <span className={`text-xs font-black px-2 py-1 rounded-md ${topic.score >= 80 ? 'bg-green-500/20 text-green-400' : topic.score >= 50 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                                                {topic.score} / 100
                                            </span>
                                        </div>
                                        <p className="text-sm text-white/60">{topic.feedback}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default ProgressCard