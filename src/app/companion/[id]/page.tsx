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
        <main className="content-wrapper">

            <Agent {...companion} />
        </main>
    )
}

export default CompanionPage