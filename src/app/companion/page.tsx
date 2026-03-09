import React from 'react'
import CompanionCard from '@/components/homePage/companionCard'
import { companionList } from '@/app/constrant'



const Companionlist = () => {
    return (
        <main>
            <section>
                <div className="text-center text-4xl font-bold text-sky-200 py-9">
                    Companions
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-9 md:mx-[10%] mx-5">
                    {companionList.map((companion) => (
                        <CompanionCard key={companion.id} companion={companion} />
                    ))}
                </div>

            </section>
        </main>
    )
}

export default Companionlist