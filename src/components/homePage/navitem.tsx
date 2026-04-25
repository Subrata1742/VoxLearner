"use client"
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface NavItemProps {
    isMobile?: boolean;
}

const Navitem = ({ isMobile }: NavItemProps) => {
    const navitems = [
        { name: "Companions", href: "/companion" },
        { name: "Pricing", href: "/subscription" },
        { name: "Profile", href: "/profile" },
        { name: "DashBoard", href: "/dashboard" },
    ]
    const params = usePathname()

    return (
        <div className={cn(
            "flex",
            isMobile ? "flex-col items-center gap-6 w-full" : "items-center gap-1 md:gap-2"
        )}>
            {navitems.map((item) => {
                const isActive = params === item.href || (item.href !== '/' && params.startsWith(item.href));
                return (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                            "nav-item-link ",
                            isMobile ? "w-full text-center text-lg" : "text-sm",
                            isActive
                                ? "nav-item-active "
                                : "nav-item-inactive "
                        )}
                    >
                        {item.name}
                    </Link>
                )
            })}
        </div>
    )
}

export default Navitem;