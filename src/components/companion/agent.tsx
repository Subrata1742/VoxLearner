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

enum CallStatus {
    INACTIVE = "INACTIVE",
    CONNECTING = "CONNECTING",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED",
}
interface AgentProps {
    subject: string;
    topic: string;
}
const Agent = ({ subject, topic }: AgentProps) => {
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [messages, setMessages] = useState<SavedMessage[]>([]);


    const lottieRef = useRef<LottieRefCurrentProps>(null);

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
        const onMessage = (message: Message) => {
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
    }
    return (
        <div>
            <div className=' flex justify-between border border-slate-700 rounded-2xl backdrop-blur-xs'>
                <div className='flex h-14 p-2 items-center'>
                    <Image src="/logo 1.png" alt="logo" className='rounded-full' width={50} height={50} />
                    <span className='font-bold text-white text-lg'>voxLearner</span>
                </div>
                <div className='flex items-center'>
                    <p className='font-bold text-white text-lg'>Topic: {topic}</p>
                </div>
                <div> </div>
            </div>

            {/* images */}
            <div className='flex justify-center items-center mx-2 h-[400px]'>
                <div className={cn(' absolute transition-opacity duration-1000', callStatus === CallStatus.ACTIVE ? 'opacity-100' : 'opacity-100', callStatus === CallStatus.CONNECTING && 'opacity-100 animate-pulse')}>
                    <Image src="/logo 1.png" alt="logo" className='rounded-full' width={50} height={50} />
                </div>
                <div className={cn('w-50 h-50 absolute transition-opacity duration-1000', callStatus === CallStatus.ACTIVE ? 'opacity-100' : 'opacity-0')}>
                    <Lottie
                        lottieRef={lottieRef}
                        animationData={soundwaves}
                        autoplay={false}
                        className="companion-lottie"
                    />
                </div>
            </div>


            {/* messages */}
            <div className='border border-slate-700 rounded-2xl backdrop-blur-xs p-1 text-white'>
                <div className=' p-2 overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] h-[60px]'>
                    {messages.map((message, index) => {
                        if (message.role === 'assistant') {
                            return (
                                <p key={index} className="max-sm:text-sm">
                                    {subject}: {message.content}
                                </p>
                            )
                        } else {
                            return <p key={index} className="text-primary max-sm:text-sm">
                                "user" : {message.content}
                            </p>
                        }
                    })}</div>
            </div>


            {/* buttons */}
            <div className='flex justify-center my-5 items-center'>
                {callStatus === CallStatus.INACTIVE &&
                    <Button className='rounded-full p-5 ' onClick={startCall}>Start Call</Button>
                }
                {callStatus === CallStatus.CONNECTING &&
                    <Button className='bg-green-500 rounded-full p-5 '>Connecting...</Button>
                }
                {callStatus === CallStatus.ACTIVE &&
                    <Button className='bg-red-500 rounded-full p-5 ' onClick={endCall}>End Call</Button>
                }
                {callStatus === CallStatus.FINISHED &&
                    <Button className=' rounded-full p-5 ' onClick={startCall}>Start Call</Button>
                }
            </div>

        </div>
    )
}

export default Agent