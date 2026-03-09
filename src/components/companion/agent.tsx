"use client"
import { vapi } from '@/lib/vapi.sdk';
import { error } from 'console';
import React, { useState, useEffect } from 'react'
import { Button } from '../ui/button';
import { configureAssistant } from '@/lib/utils';

enum CallStatus {
    INACTIVE = "INACTIVE",
    CONNECTING = "CONNECTING",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED",
}
const Agent = ({ name, image, description, duration }: any) => {
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [isSpeaking, setIsSpeaking] = useState(false);

    useEffect(() => {
        const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
        const onCallEnd = () => setCallStatus(CallStatus.FINISHED);
        const onMessage = () => { }
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
        vapi.start(configureAssistant());
        setCallStatus(CallStatus.CONNECTING);
        alert("Call started");
    }
    const endCall = () => {
        vapi.stop();
        setCallStatus(CallStatus.FINISHED);
        alert("Call ended");
    }
    return (
        <div>Agent

            <Button onClick={startCall}>Start Call</Button>
            <Button onClick={endCall}>End Call</Button>
        </div>
    )
}

export default Agent