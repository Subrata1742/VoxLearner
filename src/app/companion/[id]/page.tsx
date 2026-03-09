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
    return (
        <div>CompanionPage

            <Agent {...companion} />
        </div>
    )
}

export default CompanionPage