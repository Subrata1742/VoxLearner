"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { History, LineChart as LineChartIcon, LayoutDashboard } from 'lucide-react';
import ProgressCard from "./progressCard";
import HistoryCard from "./historyCard";
import InfoCard from "./infoCard";



export default function DashboardUI({ metrics, recentCompanions, progressReport, hasPremium }: { metrics: any, recentCompanions: any, progressReport: any, hasPremium: any }) {

    return (
        <Tabs defaultValue="overview" className="w-full">

            {/* TABS NAVIGATION */}
            <TabsList className="bg-black/5 border border-white/10 h-14 px-2 rounded-2xl mb-8">
                <TabsTrigger value="overview" className="rounded-xl text-gray-200 hover:text-white data-[state=active]:bg-[#e94560] data-[state=active]:text-white">
                    <LayoutDashboard size={16} className="mr-2" /> Overview
                </TabsTrigger>
                <TabsTrigger value="history" className="rounded-xl text-gray-200 hover:text-white data-[state=active]:bg-[#e94560] data-[state=active]:text-white">
                    <History size={16} className="mr-2" /> History
                </TabsTrigger>
                <TabsTrigger value="progress" className="rounded-xl text-gray-200 hover:text-white data-[state=active]:bg-[#e94560] data-[state=active]:text-white">
                    <LineChartIcon size={16} className="mr-2" /> Progress
                </TabsTrigger>
            </TabsList>

            {/* TAB 1: OVERVIEW */}
            <TabsContent value="overview" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <InfoCard metrics={metrics} recentCompanions={recentCompanions} />
            </TabsContent>



            {/* TAB 2: HISTORY */}
            <TabsContent value="history" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <HistoryCard recentCompanions={recentCompanions} />
            </TabsContent>


            {/* TAB 3: PROGRESS  */}
            <TabsContent value="progress" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <ProgressCard progressReport={progressReport} hasPremium={hasPremium} />
            </TabsContent>

        </Tabs>
    );
}