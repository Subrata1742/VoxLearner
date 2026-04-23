import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import CompanionCard from "@/components/homePage/companionCard";
import { getAllCompanions } from "@/lib/actions/companion.action";
import { Bot, Sparkles, Mic, Brain, Zap, ArrowRight, UserPlus, PlayCircle } from "lucide-react";

export default async function Home() {
  const companionsList = await getAllCompanions();

  return (
    <main className="content-wrapper flex flex-col gap-24">

      {/* 1. Hero Section */}
      <section className="header-section ">
        <div className="flex flex-col gap-4 items-center md:items-start md:w-3/5">
          <div className="pro-badge flex items-center max-md:py-2 gap-2 md:gap-2 max-md:text-xs capitalize">
            <Sparkles size={16} />
            <span>Next-Gen Education Platform</span>
          </div>

          <h1 className="hero-title">
            <span className="bg-clip-text text-transparent bg-linear-to-r from-white to-[#e94560]">Vox Learner</span>
            <br />
            <span className="text-white text-[1.7rem] md:text-[2.5rem]">A Real-Time, Voice-Driven</span>
            <br />
            <span className="text-white/90 text-[1.2rem] md:text-[2rem]">AI Learning Companion</span>
          </h1>

          <p className="hero-subtitle">
            Transform your learning experience. Speak, learn, and grow with a personalized educational companion that adapts to your unique journey.
          </p>

          <Link href="/companion/new" className="create-btn flex items-center gap-2">
            Get Started <ArrowRight size={18} />
          </Link>
        </div>

        <div className="max-md:hidden flex items-center justify-center relative md:w-2/5">
          <div className="absolute inset-0 bg-[#e94560]/20 blur-[80px] rounded-full scale-150"></div>
          <Image
            src="/hero1.png"
            alt="Hero"
            width={400}
            height={400}
            className="relative z-10 drop-shadow-[0_0_40px_rgba(233,69,96,0.4)] hover:scale-105 transition-transform duration-700 ease-out"
            priority
          />
        </div>
      </section>

      {/* 2. Features Section */}
      <section className="flex flex-col gap-10">
        <div className="text-center">
          <h2 className="user-name max-md:text-[1.5rem]!">Why Choose Vox Learner?</h2>
          <p className="user-email max-w-2xl mx-auto">Experience the next generation of online learning powered by advanced artificial intelligence.</p>
        </div>

        <div className="stats-grid grid-cols-1! md:grid-cols-3!">
          <div className="stat-card group">
            <div className="feature-icon-wrapper border-[#e94560]/20 bg-[#e94560]/10 text-[#e94560] group-hover:scale-110">
              <Mic size={32} />
            </div>
            <h3 className="companion-name mb-3">Real-Time Voice</h3>
            <p className="companion-topic">Practice speaking naturally. No typing required. Engage in fluid, real-time conversations.</p>
          </div>

          <div className="stat-card group">
            <div className="feature-icon-wrapper border-blue-500/20 bg-blue-500/10 text-blue-400 group-hover:scale-110">
              <Brain size={32} />
            </div>
            <h3 className="companion-name mb-3">Adaptive Memory</h3>
            <p className="companion-topic">Your companion remembers past sessions and adapts to your personal learning pace and style.</p>
          </div>

          <div className="stat-card group">
            <div className="feature-icon-wrapper border-purple-500/20 bg-purple-500/10 text-purple-400 group-hover:scale-110">
              <Zap size={32} />
            </div>
            <h3 className="companion-name mb-3">Instant Feedback</h3>
            <p className="companion-topic">Get immediate, constructive corrections and guidance to master your subject faster.</p>
          </div>
        </div>
      </section>

      {/* 3. How It Works Section */}
      <section className="stat-card text-left! p-10! md:p-16!">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#e94560]/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="text-center mb-16 relative z-10">
          <h2 className="user-name">How It Works</h2>
          <p className="user-email">Start your voice-driven learning journey in three simple steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="step-indicator">1</div>
            <div className="step-card-icon"><UserPlus size={32} /></div>
            <h3 className="companion-name mb-2">Create Profile</h3>
            <p className="companion-topic">Sign up and define your learning goals.</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="step-indicator">2</div>
            <div className="step-card-icon"><Bot size={32} /></div>
            <h3 className="companion-name mb-2">Build Companion</h3>
            <p className="companion-topic">Choose the subject and personalize.</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="step-indicator">3</div>
            <div className="step-card-icon! !text-[#e94560]! !border-[#e94560]/20!"><PlayCircle size={32} /></div>
            <h3 className="companion-name mb-2">Start Talking</h3>
            <p className="companion-topic">Launch a live voice call and learn.</p>
          </div>
        </div>
      </section>

      {/* 4. Companion List Section */}
      <section className="companions-section">
        <h2 className="section-title">
          <Bot size={28} className="text-[#e94560]" /> Your AI Companions
        </h2>

        {!companionsList || companionsList.length === 0 ? (
          <div className="empty-state">
            <h3 className="companion-name text-2xl mb-2">No Companions Found</h3>
            <p>Start your journey by creating a new AI learning companion.</p>
            <Link href="/companion/new" className="create-btn flex items-center gap-2 mx-auto w-fit">
              Create Companion <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <>
            <div className="companions-grid">
              {companionsList.slice(0, 3).map((companion) => (
                <Link href={`/companion/${companion.id}`} key={companion.id} className="no-underline">
                  <CompanionCard companion={companion} />
                </Link>
              ))}
            </div>

            {companionsList.length > 3 && (
              <div className="flex justify-center mt-12">
                <Link href="/companion" className="create-btn !from-transparent! !to-transparent! border border-white/20">
                  View All Companions
                </Link>
              </div>
            )}
          </>
        )}
      </section>

      {/* 5. CTA Section */}
      <section className="stat-card p-12! md:p-20! bg-linear-to-br! from-[#0f3460]! to-[#1a1a2e]! mb-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(233,69,96,0.3)_0%,transparent_50%)]"></div>
        <div className="relative z-10 flex flex-col items-center">
          <h2 className="text-[1.4rem] md:text-[3.5rem]  font-black text-white mb-6 leading-tight max-w-3xl">
            Ready to transform your <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-[#e94560]">learning journey?</span>
          </h2>
          <p className="user-email text-lg md:text-xl mb-10 max-w-2xl font-medium">
            Join Vox Learner today and experience the most natural, effective way to master new skills through live voice interaction.
          </p>
          <Link href="/companion/new" className="create-btn py-2! md:py-4! px-5! md:px-10! text-sm md:text-lg flex items-center gap-3">
            Create Your First Companion <ArrowRight size={24} />
          </Link>
        </div>
      </section>

    </main>
  );
}