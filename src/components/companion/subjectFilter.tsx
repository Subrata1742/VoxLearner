"use client";

import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { ChangeEvent } from "react";

const subjects = ["Language", "Science", "History", "Coding", "Math"];

export const SubjectFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Default to an empty string if there is no subject in the URL (the "All" state)
    const currentSubject = searchParams.get("subject") || "";

    const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const subject = e.target.value;

        const url = qs.stringifyUrl(
            {
                url: window.location.pathname,
                query: {
                    subject: subject === "" ? null : subject,
                    topic: searchParams.get("topic"),
                },
            },
            { skipNull: true, skipEmptyString: true }
        );

        router.push(url);
    };

    return (
        <select
            value={currentSubject}
            onChange={onChange}
            className="px-6 py-2 w-full sm:w-auto rounded-2xl text-sm font-medium border transition outline-none cursor-pointer bg-white/5 border-white/10 text-white/80 hover:border-white/20 focus:border-[#e94560] focus:ring-1 focus:ring-[#e94560]"
        >

            <option value="" className="bg-[#1a1a1a] text-white">
                All Subjects
            </option>
            {subjects.map((s) => (
                <option key={s} value={s} className="bg-[#1a1a1a] text-white">
                    {s}
                </option>
            ))}
        </select>
    );
};