import { companionList } from '@/app/constrant';
import React from 'react'
import Agent from '@/components/companion/agent';

interface urlIdProps {
    params: {
        id: string;
    };
}
const CompanionPage = async ({ params }: urlIdProps) => {
    const { id } = await params;
    const companion = companionList.find((companion) => companion.id.toString() === id);
    if (!companion) {
        return <div>Companion not found</div>;
    }

    return (
        <main className='mx-[20%] py-5'>

            <Agent {...companion} />
        </main>
    )
}

export default CompanionPage