import { currentUser } from '@clerk/nextjs/server';
import { getUserDashboardMetrics, getRescentSessions, hasPremiumPlan, hasProPlan } from '@/lib/actions/companion.action';
import DashboardUI from '@/components/dashboard/dashboardUI';
import { generateProgressReport } from '@/lib/actions/progress.action';

export default async function DashboardPage() {
    const user = await currentUser();

    if (!user) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="empty-state">Please sign in to view your dashboard.</div>
            </div>
        );
    }

    const hasPremium = await hasPremiumPlan();

    const [metrics, recentCompanions, progressReport] = await Promise.all([
        getUserDashboardMetrics(),
        getRescentSessions(),
        hasPremium ? generateProgressReport() : null
    ]);


    const userData = {
        firstName: user.firstName || 'Learner',
    };



    return (
        <main className="content-wrapper">
            <header className="mb-8">
                <h1 className="hero-title text-3xl md:text-4xl m-0">
                    Welcome back, <span className="bg-clip-text text-transparent bg-linear-to-r from-white to-[#e94560]">{userData.firstName}</span>
                </h1>
                <p className="user-email mt-2">Manage your learning journey, history, and progress.</p>
            </header>

            <DashboardUI
                metrics={metrics}
                recentCompanions={recentCompanions}
                progressReport={progressReport}
                hasPremium={hasPremium}
            />
        </main>
    );
}