import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import CompanionCard from "@/components/homePage/companionCard";
import { getAllCompanions } from "@/lib/actions/companion.action";
import { Bot } from "lucide-react";


export default async function Home() {
  const companionsList = await getAllCompanions();


  return (
    <main className="content-wrapper">
      <section className=" header-section ">
        <div className="flex flex-col gap-3 items-start justify-center md:w-1/2">
          <div className=" text-start md:text-4xl text-xl ">
            <div className=" font-bold text-sky-200">Vox Learner :
              <span className=" md:text-4xl text-xl  text-white"> A Real-Time,
                <br /> Voice-Driven Al Learning
                <br /> Companion & personalized
                <br />Education Saas Platform
              </span>
            </div>
          </div>

          <div>
            <p className="text-muted text-lg">Transform your learning experience. Speak, learn, and grow with
              <br /> a companion that adapts to your unique journey.</p>
          </div>
          <div className="flex items-center justify-start md:w-1/2 w-full gap-2 ">

            <Button asChild variant="default" className='mx-2 rounded-full w-full text-xl px-12 ' size="lg">
              <Link href="/companion/new">Get Started</Link>
            </Button>
          </div>
        </div>
        <div className=" max-md:hidden flex flex-col items-center justify-center">
          <Image src="/hero1.png" alt="Hero" width={350} height={350} />
        </div>
      </section>

      {/* companion list */}

      <section className="companion-section ">
        <h2 className="section-title">
          <Bot size={28} color="#e94560" /> Your AI Companions
        </h2>

        {!companionsList && <p className="text-center  text-sky-200">No Companions Found</p>}
        <div className="companions-grid ">
          {companionsList?.slice(0, 3).map((companion) => (
            <Link href={`/companion/${companion.id}`} key={companion.id} style={{ textDecoration: 'none' }}>
              <CompanionCard companion={companion} />
            </Link>
          ))}
        </div>
        <div className="flex items-center justify-center py-5">
          <Button asChild variant="default" className='mx-2 rounded-full text-xl px-12' size="lg">
            <Link href="/companion">View All</Link>
          </Button>
        </div>
      </section>

    </main>
  );
}
