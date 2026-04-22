"use client"
import { vapi } from '@/lib/vapi.sdk';
import { toast } from 'sonner';
import React, { useState, useEffect, useRef } from 'react'
import { Button } from '../ui/button';
import { configureAssistant } from '@/lib/utils';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import soundwaves from '@/app/constrant/sound waves.json'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { updateConversations } from '@/lib/actions/companion.action';
import { Mic, MicOff, Phone, PhoneOff, ArrowLeft, Activity, MessageSquareText } from 'lucide-react';

enum CallStatus {
    INACTIVE = "INACTIVE",
    CONNECTING = "CONNECTING",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED",
}
interface AgentProps {
    id: string;
    subject: string;
    topic: string;
}
const Agent = ({ id, subject, topic }: AgentProps) => {
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [messages, setMessages] = useState<SavedMessage[]>([]);

    const lottieRef = useRef<LottieRefCurrentProps>(null);
    const router = useRouter();

    useEffect(() => {
        if (lottieRef) {
            if (isSpeaking) {
                lottieRef.current?.play()
            } else {
                lottieRef.current?.stop()
            }
        }
    }, [isSpeaking, lottieRef])

    useEffect(() => {
        const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
        const onCallEnd = () => setCallStatus(CallStatus.FINISHED);
        const onMessage = (message: any) => {
            if (message.type === 'transcript' && message.transcriptType === 'final') {
                const newMessage = { role: message.role, content: message.transcript }
                setMessages((prev) => [newMessage, ...prev])
            }
        }

        const onSpeechStart = () => { setIsSpeaking(true) }
        const onSpeechEnd = () => { setIsSpeaking(false) }
        const onError = (error: Error) => console.log('Error', error);

        vapi.on('call-start', onCallStart);
        vapi.on('call-end', onCallEnd);
        vapi.on('message', onMessage);
        vapi.on('error', onError);
        vapi.on('speech-start', onSpeechStart);
        vapi.on('speech-end', onSpeechEnd);
        return () => {
            vapi.off('call-start', onCallStart);
            vapi.off('call-end', onCallEnd);
            vapi.off('message', onMessage);
            vapi.off('error', onError);
            vapi.off('speech-start', onSpeechStart);
            vapi.off('speech-end', onSpeechEnd);
        }

    }, []);

    const toggleMicrophone = () => {
        const isMutedState = vapi.isMuted();
        vapi.setMuted(!isMutedState);
        setIsMuted(!isMutedState)
    }
    const startCall = () => {
        setCallStatus(CallStatus.CONNECTING);
        const assistantOverrides = {
            variableValues: { subject, topic },
            clientMessages: ["transcript"],
            serverMessages: [],
        }
        // @ts-expect-error
        vapi.start(configureAssistant(), assistantOverrides);
        toast.success("Call started");
    }
    const endCall = () => {
        vapi.stop();
        setCallStatus(CallStatus.FINISHED);
        toast.success("Call ended");
        updateConversations(id, messages);
        router.back();
    }

    return (
        <div className="flex flex-col gap-4 w-full h-full max-w-6xl mx-auto ">
            {/* Header - Fixed Height */}
            <div className='agent-header-card'>
                <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-white hover:bg-white/10 rounded-full transition-colors">
                    <ArrowLeft size={24} />
                </Button>
                <div className='flex items-center gap-4'>
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#e94560]/50 relative shadow-[0_0_15px_rgba(233,69,96,0.3)]">
                        <Image src="/logo 1.png" alt="logo" fill className="object-cover" />
                    </div>
                    <div className="flex flex-col items-start">
                        <span className='font-extrabold text-transparent bg-clip-text bg-linear-to-r from-white to-[#e94560] text-xl md:text-2xl'>{subject}</span>
                        <span className='text-[10px] md:text-xs text-white/50 tracking-[0.2em] uppercase'>AI Companion</span>
                    </div>
                </div>
                <div className='hidden sm:flex items-center px-5 py-2 bg-[#e94560]/10 border border-[#e94560]/20 rounded-full'>
                    <span className='text-sm text-[#e94560] font-semibold tracking-wide'>Topic: {topic}</span>
                </div>
            </div>

            {/* Mobile Topic Badge */}
            <div className='sm:hidden flex justify-center z-10'>
                <div className='inline-flex items-center px-4 py-1.5 bg-[#e94560]/10 border border-[#e94560]/20 rounded-full'>
                    <span className='text-xs text-[#e94560] font-semibold'>Topic: {topic}</span>
                </div>
            </div>


            <div className='flex flex-col gap-2 flex-1 w-full justify-center z-10'>
                {/* Main Center Area: Visuals & Overlay (Flex Grow) */}
                <div className='agent-center-container'>
                    <div className="agent-glow-bg"></div>

                    {/* Status Indicator Top */}
                    <div className="agent-status-badge">
                        <div className={cn("w-2.5 h-2.5 rounded-full",
                            callStatus === CallStatus.ACTIVE ? "bg-green-500 animate-pulse shadow-[0_0_12px_rgba(34,197,94,0.9)]" :
                                callStatus === CallStatus.CONNECTING ? "bg-yellow-500 animate-pulse shadow-[0_0_12px_rgba(234,179,8,0.9)]" : "bg-gray-500"
                        )}></div>
                        <span className="text-xs text-white/90 font-bold tracking-[0.15em] uppercase">{callStatus}</span>
                    </div>

                    {/* Central Visuals */}
                    <div className="relative w-full flex-1 flex items-center justify-center min-h-[250px] md:min-h-[300px]">
                        {/* Avatar Core */}
                        <div className={cn('agent-avatar-ring',
                            callStatus === CallStatus.ACTIVE ? 'scale-110 shadow-[0_0_120px_rgba(233,69,96,0.6)] border-[#e94560]/80' : 'scale-100 border-white/10',
                            callStatus === CallStatus.CONNECTING && 'animate-pulse border-yellow-500/50 shadow-[0_0_60px_rgba(234,179,8,0.3)]'
                        )}>
                            <Image src="/logo 1.png" alt="logo" width={224} height={224} className="opacity-95 object-cover w-full h-full" priority />
                        </div>

                        {/* Soundwaves Animation */}
                        <div className={cn('absolute transition-opacity duration-1000 w-[450px] h-[450px] md:w-[750px] md:h-[750px] pointer-events-none', callStatus === CallStatus.ACTIVE ? 'opacity-100 scale-100' : 'opacity-0 scale-90')}>
                            <Lottie
                                lottieRef={lottieRef}
                                animationData={soundwaves}
                                autoplay={false}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                </div>



                {/* Live Transcript Subtitle Overlay */}
                <div className="w-full flex justify-center z-30 h-[100px] md:h-[130px] mt-2">
                    <div className="agent-transcript-box">
                        {messages.length > 0 ? (
                            <div key={messages.length} className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-500">
                                <div className="flex items-center gap-2 mb-2">
                                    <MessageSquareText size={14} className={messages[0].role === 'assistant' ? "text-[#e94560]" : "text-sky-400"} />
                                    <span className={cn("text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase",
                                        messages[0].role === 'assistant' ? "text-[#e94560]" : "text-sky-400"
                                    )}>
                                        {messages[0].role === 'assistant' ? subject : 'You'}
                                    </span>
                                </div>
                                <div className="w-full overflow-y-auto pointer-events-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full flex flex-col justify-center max-h-[60px] md:max-h-[80px]">
                                    <p className="text-white text-base md:text-xl lg:text-2xl font-medium leading-relaxed max-w-2xl drop-shadow-md mx-auto">
                                        {messages[0].content}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center text-white/30 gap-2 h-full">
                                <Activity size={24} className={cn("opacity-50", callStatus === CallStatus.ACTIVE && "animate-pulse text-[#e94560] opacity-80")} />
                                <span className="text-sm font-medium tracking-wide">
                                    {callStatus === CallStatus.ACTIVE ? "Listening to conversation..." : "Waiting for conversation to start"}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>



            {/* Call Controls Box - Docked at bottom */}
            <div className='flex justify-center items-center gap-5 md:gap-8 z-40 w-full px-4'>
                {callStatus === CallStatus.ACTIVE && (
                    <Button
                        onClick={toggleMicrophone}
                        title={isMuted ? "Unmute Microphone" : "Mute Microphone"}
                        className={cn(
                            "w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)]",
                            isMuted
                                ? "bg-red-500/20 text-red-500 border-2 border-red-500/50 hover:bg-red-500/30"
                                : "bg-white/10 text-white border-2 border-white/20 hover:bg-white/20 hover:scale-105"
                        )}
                    >
                        {isMuted ? <MicOff size={28} /> : <Mic size={28} />}
                    </Button>
                )}

                {(callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED) && (
                    <Button variant={"StartCall"}
                        onClick={startCall}

                    >
                        <Phone className=" h-7 w-7 md:h-10 md:w-10" /> {callStatus === CallStatus.FINISHED ? 'Start New Call' : 'Start Call'}
                    </Button>
                )}

                {callStatus === CallStatus.CONNECTING && (
                    <Button
                        disabled
                        className="h-10 md:h-15 px-10 md:px-14 rounded-full bg-yellow-500/20 text-yellow-500 border-2 border-yellow-500/50 font-bold text-lg md:text-xl shadow-[0_0_30px_rgba(234,179,8,0.2)]"
                    >
                        <Activity className=" h-7 w-7 md:h-10 md:w-10 animate-spin" /> Connecting...
                    </Button>
                )}

                {callStatus === CallStatus.ACTIVE && (
                    <Button variant={"EndCall"}
                        onClick={endCall}

                    >
                        <PhoneOff className=" h-7 w-7 md:h-10 md:w-10" /> End Call
                    </Button>
                )}
            </div>

        </div>
    )
}

export default Agent