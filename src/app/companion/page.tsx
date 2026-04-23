
import React from 'react'
import CompanionCard from '@/components/homePage/companionCard'
import { getAllCompanions } from '@/lib/actions/companion.action';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import { Bot, Plus } from 'lucide-react';
import { SubjectFilter } from '@/components/companion/subjectFilter';
import { SearchInput } from '@/components/companion/searchInput';





const Companionlist = async ({ searchParams }: SearchParams) => {
    const filters = await searchParams;
    const subject = filters.subject ? filters.subject : '';
    const topic = filters.topic ? filters.topic : '';


    const { isAuthenticated } = await auth()
    if (!isAuthenticated) {
        redirect("/sign-in");
    }

    const companionList = await getAllCompanions({ subject, topic });
    console.log(companionList);
    return (
        <main className='content-wrapper'>

            <section className="stat-card cursor-default">
                <div className="flex justify-between items-center max-sm:flex-col max-sm:items-start gap-4">
                    <h1 className="user-name">Companion Library</h1>
                    <Link href="/companion/new" className="create-btn flex items-center gap-2 mt-0! max-sm:mx-auto! py-1.5! md:py-2! px-6! text-sm">
                        <Plus size={18} /> New Companion
                    </Link>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-white/5">
                    <SubjectFilter />
                    <SearchInput />
                </div>
            </section>
            <section className='companion-section'>
                <h2 className="section-title">
                    <Bot size={28} color="#e94560" /> Your AI Companions
                </h2>
                <div className="companions-grid">
                    {companionList?.map((companion) => (
                        <Link key={companion.id} href={`/companion/${companion.id}`}>
                            <CompanionCard companion={companion} />
                        </Link>
                    ))}
                </div>

            </section>
        </main>
    )
}

export default Companionlist