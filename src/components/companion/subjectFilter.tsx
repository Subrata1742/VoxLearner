"use client";

import { subject } from "@/app/constrant";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { ChangeEvent } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"



export const SubjectFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentSubject = searchParams.get("subject") || "";

    const onChange = (subject: string) => {

        const url = qs.stringifyUrl(
            {
                url: window.location.pathname,
                query: {
                    subject: subject === "all" ? null : subject,
                    topic: searchParams.get("topic"),
                },
            },
            { skipNull: true, skipEmptyString: true }
        );

        router.push(url);
    };

    return (
        <Select defaultValue="" value={currentSubject} onValueChange={onChange}>
            <SelectTrigger id="style" className="px-6 py-2 w-full sm:w-auto rounded-2xl text-sm font-medium border transition outline-none cursor-pointer bg-white/5 border-white/10 text-white/80 hover:border-white/20 focus:border-[#e94560] focus:ring-1 focus:ring-[#e94560]">
                <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a2e] border-white/10 text-white rounded-xl ">
                <SelectGroup>
                    <SelectItem value="all" className="cursor-pointer focus:bg-white/20 focus:text-white transition-colors">All Subjects</SelectItem>
                    {subject.map((s) => (
                        <SelectItem key={s}
                            value={s}
                            className="cursor-pointer focus:bg-white/20 focus:text-white transition-colors"
                        >
                            {s}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};