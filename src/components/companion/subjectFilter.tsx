"use client";

import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

const subjects = ["Language", "Science", "History", "Coding", "Math"];

export const SubjectFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentSubject = searchParams.get("subject");

    const onClick = (subject: string | null) => {
        const url = qs.stringifyUrl({
            url: window.location.href,
            query: {
                subject: subject === currentSubject ? null : subject, // Toggle off if clicked again
                topic: searchParams.get("topic"),
            },
        }, { skipNull: true, skipEmptyString: true });

        router.push(url);
    };

    return (
        <div className="flex flex-wrap gap-2">
            <button
                onClick={() => onClick(null)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium border transition ${!currentSubject
                        ? "bg-[#e94560] border-[#e94560] text-white"
                        : "bg-white/5 border-white/10 text-white/60 hover:border-white/20"
                    }`}
            >
                All
            </button>
            {subjects.map((s) => (
                <button
                    key={s}
                    onClick={() => onClick(s)}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium border transition ${currentSubject === s
                            ? "bg-[#e94560] border-[#e94560] text-white"
                            : "bg-white/5 border-white/10 text-white/60 hover:border-white/20"
                        }`}
                >
                    {s}
                </button>
            ))}
        </div>
    );
};