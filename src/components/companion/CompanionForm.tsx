"use client";
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
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
import { useAuth } from '@clerk/nextjs';

const CompanionForm = () => {

    const { isSignedIn } = useAuth()
    if (!isSignedIn) {
        redirect("/sign-in");
    }

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

        <form onSubmit={handleCreateCompanion} >
            <FieldGroup className='gap-3'>
                <FieldSet className='gap-0'>
                    <FieldLegend>Companion builder</FieldLegend>
                    <FieldDescription>
                        Create your own companion
                    </FieldDescription>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="name">
                                Compaion Name
                            </FieldLabel>
                            <Input
                                id="name"
                                placeholder="Evil Rabbit"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="subject">
                                Subject
                            </FieldLabel>
                            <Select defaultValue="" value={formData.subject} onValueChange={(value) => setFormData({ ...formData, subject: value })}>
                                <SelectTrigger id="subject">
                                    <SelectValue placeholder="Subject" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="science">Science</SelectItem>
                                        <SelectItem value="maths">Maths</SelectItem>
                                        <SelectItem value="language">Language</SelectItem>
                                        <SelectItem value="coding">Coding</SelectItem>
                                        <SelectItem value="history">History</SelectItem>
                                        <SelectItem value="economics">Economics</SelectItem>
                                        <SelectItem value="chemistry">Chemistry</SelectItem>
                                        <SelectItem value="physics">Physics</SelectItem>
                                        <SelectItem value="biology">Biology</SelectItem>
                                        <SelectItem value="geography">Geography</SelectItem>
                                        <SelectItem value="computer">Computer</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="topic">
                                What should companion help with?
                            </FieldLabel>
                            <Textarea
                                id="topic"
                                value={formData.topic}
                                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                                placeholder="Topic"
                                className="resize-none"
                            />
                        </Field>


                    </FieldGroup>
                </FieldSet>

                <div className='flex items-center justify-between '>
                    <FieldSet className='gap-0'>
                        <FieldLegend>Voice</FieldLegend>

                        <FieldGroup>

                            <Field orientation="horizontal">
                                <RadioGroup defaultValue='male' className='flex items-center gap-2' onValueChange={(value) => setFormData({ ...formData, voice: value })}>
                                    <div className='flex items-center gap-2'>
                                        <RadioGroupItem className='bg-white' value="male" id='male' />
                                        <FieldLabel
                                            htmlFor="male"
                                            className="font-normal"
                                        >
                                            male
                                        </FieldLabel>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <RadioGroupItem className='bg-white' value="female" id='female' />
                                        <FieldLabel
                                            htmlFor="female"
                                            className="font-normal"
                                        >
                                            female
                                        </FieldLabel>
                                    </div>
                                </RadioGroup>

                            </Field>


                        </FieldGroup>
                    </FieldSet>

                    <FieldSet className='w-[50%] gap-0'>
                        <FieldLegend>Style</FieldLegend>

                        <FieldGroup>

                            <Field>
                                <Select defaultValue="" value={formData.style} onValueChange={(value) => setFormData({ ...formData, style: value })}>
                                    <SelectTrigger id="style">
                                        <SelectValue placeholder="Style" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="casual">casual</SelectItem>
                                            <SelectItem value="formal">formal</SelectItem>

                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </Field>


                        </FieldGroup>
                    </FieldSet>
                </div>
                <FieldSet className='gap-0'>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="duration">
                                Duration
                            </FieldLabel>
                            <Input
                                id="duration"
                                value={formData.duration}
                                onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
                                placeholder="45"
                                required
                                type='number'
                            />
                        </Field>
                    </FieldGroup>
                </FieldSet>
                <Field orientation="horizontal">
                    <Button type="submit">Submit</Button>
                    <Link href="/">
                        <Button className='text-black' variant="outline" type="button">
                            Cancel
                        </Button>
                    </Link>
                </Field>
            </FieldGroup>
        </form>
    )
}

export default CompanionForm