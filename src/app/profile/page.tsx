
import { currentUser } from '@clerk/nextjs/server';

import Link from 'next/link';
import { Bot, Activity } from 'lucide-react';
import { conversationCount, getAllCompanions } from '@/lib/actions/companion.action';
import CompanionCard from '@/components/homePage/companionCard';

export default async function ProfilePage() {
    const user = await currentUser();

    if (!user) {
        return (
            <div className="layout-container" style={{ justifyContent: 'center' }}>
                <div className="empty-state">
                    <h2 className="text-2xl text-white mb-2">Please sign in</h2>
                    <p>You need to be signed in to view your profile.</p>
                </div>
            </div>
        );
    }

    // Fetch companions for the user
    const companions = await getAllCompanions();

    // Fetch total conversations across all companions
    const totalConversations = await conversationCount();

    return (

        <div className="content-wrapper">

            {/* Header Profile Section */}
            <div className="header-section">
                <div className="relative">
                    {/* Using standard img to avoid next.config remote patterns edit */}
                    <img
                        src={user.imageUrl}
                        alt="Profile"
                        className="avatar-img"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="user-name">{user.firstName} {user.lastName}</h1>
                    <p className="user-email">{user.emailAddresses[0]?.emailAddress}</p>
                    <div>
                        <span className="pro-badge">Learner Pro</span>
                    </div>
                </div>
            </div>

            {/* Statistics Overview */}
            <div className="stats-grid">
                <div className="stat-card">
                    <Bot size={32} className="text-[#e94560]" style={{ margin: '0 auto 1rem', display: 'block' }} />
                    <h2 className="stat-value">{companions?.length}</h2>
                    <p className="stat-label">Companions Created</p>
                </div>
                <div className="stat-card">
                    <Activity size={32} className="text-[#e94560]" style={{ margin: '0 auto 1rem', display: 'block' }} />
                    <h2 className="stat-value">{totalConversations}</h2>
                    <p className="stat-label">Total Conversations</p>
                </div>
            </div>

            {/* Companions List Section */}
            <div className="companion-section">
                <h2 className="section-title">
                    <Bot size={28} color="#e94560" /> Your AI Companions
                </h2>

                {companions?.length === 0 ? (
                    <div className="empty-state">
                        <h3 className="text-2xl text-white mb-2">No companions yet!</h3>
                        <p>Create your first AI learning companion to start your journey.</p>
                        <Link href="/companion/new" className="create-btn">
                            Create Companion
                        </Link>
                    </div>
                ) : (
                    <div className="companions-grid">
                        {companions?.map((companion: any) => (
                            <Link href={`/companion/${companion.id}`} key={companion.id} style={{ textDecoration: 'none' }}>
                                <CompanionCard companion={companion} />
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>

    );
}