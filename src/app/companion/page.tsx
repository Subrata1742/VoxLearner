import React from 'react'
import CompanionCard from '@/components/homePage/companionCard'
import { getAllCompanions } from '@/lib/actions/companion.action';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import { Bot } from 'lucide-react';





const Companionlist = async () => {
    const { isAuthenticated } = await auth()
    if (!isAuthenticated) {
        redirect("/sign-in");
    }

    const companionList = await getAllCompanions();
    console.log(companionList);
    return (
        <main className='content-wrapper'>
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