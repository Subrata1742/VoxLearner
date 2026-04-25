"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useDebounce } from "use-debounce"; // You might need to install/create this hook
import qs from "query-string";

export const SearchInput = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const topic = searchParams.get("topic");
    const subject = searchParams.get("subject");

    const [value, setValue] = useState(topic || "");
    const [debouncedValue] = useDebounce(value, 500);

    useEffect(() => {
        const url = qs.stringifyUrl({
            url: window.location.href,
            query: {
                subject: subject,
                topic: debouncedValue,
            },
        }, { skipNull: true, skipEmptyString: true });

        router.push(url);
    }, [debouncedValue, router, subject]);

    return (
        <div className="relative flex items-center w-full md:w-72">
            <Search className="absolute left-4 w-4 h-4 text-white/40" />
            <input
                onChange={(e) => setValue(e.target.value)}
                value={value}
                placeholder="Search by name or topic..."
                className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#e94560]/50 transition"
            />
        </div>
    );
};