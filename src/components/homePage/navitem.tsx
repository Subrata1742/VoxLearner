"use client"
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const navitem = () => {
    const navitems = [
        {
            name: "Companion",
            href: "/companion",
        },
        {
            name: "Pricing",
            href: "/subscription",
        },
        {
            name: "Profile",
            href: "/profile",
        },
    ]
    const params = usePathname()

    return (
        <div className="flex mx-auto gap-6">
            {navitems.map((item) => (
                <Link
                    key={item.name}
                    href={item.href}
                    className={cn("text-sm font-medium text-slate-300 transition-colors hover:text-white hover:font-bold", params === item.href && "text-white font-bold")}
                >
                    {item.name}
                </Link>
            ))}
        </div>
    )
}

export default navitem