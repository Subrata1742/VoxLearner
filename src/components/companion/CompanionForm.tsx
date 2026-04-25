"use client";
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Field,

    FieldGroup,
    FieldLabel,

} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from 'next/link'
import { createCompanion } from '@/lib/actions/companion.action'
import { redirect } from 'next/navigation';
import { Bot, Sparkles, Mic, Clock, Type, X } from 'lucide-react';
import { subject } from '@/app/constrant';

const CompanionForm = () => {


    const [formData, setFormData] = useState<CreateCompanion>({
        name: "",
        subject: "",
        topic: "",
        voice: "",
        style: "",
        duration: 0,
    });

    const handleCreateCompanion = async (e: React.FormEvent) => {
        e.preventDefault();
        const companion = await createCompanion(formData);
        if (companion) {
            redirect(`/companion`);
        } else {
            console.log('Failed to create a companion');
            redirect('/');
        }

    };

    return (

        <form onSubmit={handleCreateCompanion} className="relative z-10 flex flex-col gap-8 w-full">
            <div className="text-center mb-2">
                <div className="form-icon-wrapper">
                    <Bot size={32} />
                </div>
                <h2 className="form-header-title">Create Companion</h2>
                <p className="text-white/60 mt-2">Design your perfect AI learning partner</p>
            </div>

            <div className="space-y-6">
                <div className="form-section-card space-y-5">
                    <h3 className="form-section-title">
                        <Type size={18} className="text-sky-400" /> Basic Details
                    </h3>

                    <FieldGroup className='gap-6'>
                        <Field>
                            <FieldLabel htmlFor="name" className="text-white/80 font-semibold ml-1">
                                Companion Name
                            </FieldLabel>
                            <Input
                                id="name"
                                placeholder="e.g. Professor Alex"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                className="form-input-field"
                            />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="subject" className="text-white/80 font-semibold ml-1">
                                Subject
                            </FieldLabel>
                            <Select defaultValue="" value={formData.subject} onValueChange={(value) => setFormData({ ...formData, subject: value })}>
                                <SelectTrigger id="subject" className="form-input-field">
                                    <SelectValue placeholder="Select a subject" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#1a1a2e] border-white/10 text-white rounded-xl">
                                    <SelectGroup>
                                        {subject.map((subject) => (
                                            <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="topic" className="text-white/80 font-semibold ml-1">
                                Specific Topic & Focus
                            </FieldLabel>
                            <Textarea
                                id="topic"
                                value={formData.topic}
                                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                                placeholder="What exactly do you want to learn? (e.g. Conversational Spanish for travel)"
                                className=" form-input-field resize-none min-h-[100px] p-4"
                            />
                        </Field>
                    </FieldGroup>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-section-card">
                        <h3 className="form-section-title">
                            <Mic size={18} className="text-purple-400" /> Voice & Style
                        </h3>

                        <div className="space-y-6 flex-1 mt-2">
                            <Field>
                                <FieldLabel className="text-white/80 font-semibold ml-1 mb-2 block">
                                    Voice Gender
                                </FieldLabel>
                                <RadioGroup defaultValue='male' className='flex items-center gap-6 mt-3' onValueChange={(value) => setFormData({ ...formData, voice: value })}>
                                    <div className='flex items-center gap-3'>
                                        <RadioGroupItem className='bg-white/10 border-white/20 text-[#e94560]' value="male" id='male' />
                                        <label htmlFor="male" className="text-white font-medium cursor-pointer">Male</label>
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <RadioGroupItem className='bg-white/10 border-white/20 text-[#e94560]' value="female" id='female' />
                                        <label htmlFor="female" className="text-white font-medium cursor-pointer">Female</label>
                                    </div>
                                </RadioGroup>
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="style" className="text-white/80 font-semibold ml-1 block">
                                    Teaching Style
                                </FieldLabel>
                                <Select defaultValue="" value={formData.style} onValueChange={(value) => setFormData({ ...formData, style: value })}>
                                    <SelectTrigger id="style" className="form-input-field mt-1">
                                        <SelectValue placeholder="Select style" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#1a1a2e] border-white/10 text-white rounded-xl">
                                        <SelectGroup>
                                            <SelectItem value="casual">Casual & Friendly</SelectItem>
                                            <SelectItem value="formal">Formal & Academic</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </Field>
                        </div>
                    </div>

                    <div className="form-section-card">
                        <h3 className="form-section-title">
                            <Clock size={18} className="text-green-400" /> Session Settings
                        </h3>
                        <div className="space-y-4 flex-1 mt-2">
                            <Field>
                                <FieldLabel htmlFor="duration" className="text-white/80 font-semibold ml-1">
                                    Target Duration (minutes)
                                </FieldLabel>
                                <Input
                                    id="duration"
                                    value={formData.duration || ""}
                                    onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
                                    placeholder="45"
                                    required
                                    type='number'
                                    min={1}
                                    max={60}
                                    className="form-input-field mt-1"
                                />
                                <p className="text-white/40 text-xs mt-3 ml-1 leading-relaxed">
                                    Set an approximate duration for your sessions. Your companion will try to pace the lesson to fit this timeframe.
                                </p>
                            </Field>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-4 mt-2 pt-6 border-t border-white/10">
                <Link href="/" className="w-full sm:w-auto">
                    <Button className='form-cancel-btn' type="button" >
                        <X size={18} /> Cancel
                    </Button>
                </Link>
                <Button type="submit" className="form-submit-btn">
                    <Sparkles size={18} /> Create Companion
                </Button>
            </div>
        </form>
    )
}

export default CompanionForm