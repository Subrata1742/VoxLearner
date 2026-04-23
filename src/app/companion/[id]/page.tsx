import Agent from '@/components/companion/agent';
import { getCompanionById } from '@/lib/actions/companion.action';

interface urlIdProps {
    params: {
        id: string;
    };
}
const CompanionPage = async ({ params }: urlIdProps) => {
    const { id } = await params;
    const companion = await getCompanionById(id);
    if (!companion) {
        return <div>Companion not found</div>;
    }

    return (
        <main className="w-full h-screen max-w-[1400px] mx-auto flex flex-col pt-4 pb-6 px-0 md:px-8">
            <Agent {...companion} />
        </main>
    )
}

export default CompanionPage