import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="layout-container fixed inset-0 z-100 flex flex-col items-center justify-center ">


            <div className="relative flex flex-col items-center gap-4">
                <div className="relative">

                    <div className="w-20 h-20 rounded-full border-4 border-white/10 border-t-[#e94560] animate-spin"></div>

                    <div className="absolute inset-0 flex items-center justify-center text-[#e94560]">
                        <Loader2 size={32} className="animate-pulse" />
                    </div>
                </div>

                <h2 className="text-2xl font-bold tracking-widest text-white uppercase animate-pulse">
                    Vox Learner
                </h2>
                <p className="text-white/50 text-sm font-medium">
                    Preparing your learning journey...
                </p>
            </div>
        </div>
    );
}