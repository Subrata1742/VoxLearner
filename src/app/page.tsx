import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import CompanionCard from "@/components/homePage/companionCard";
import { companionList } from "./constrant";

export default function Home() {



  return (
    <main >
      <section className="flex items-center justify-between md:mx-[10%] mx-5 p-5 mt-5 border backdrop-blur-xl border-slate-700 rounded-4xl ">
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
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </div>
        </div>
        <div className=" max-md:hidden flex flex-col items-center justify-center">
          <Image src="/hero1.png" alt="Hero" width={350} height={350} />
        </div>
      </section>

      {/* companion list */}

      <section className="md:mx-[10%] mx-5">
        <div className="text-center text-4xl font-bold text-sky-200 py-9">
          Companions
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3  gap-9 ">
          {companionList.slice(0, 3).map((companion) => (
            <CompanionCard key={companion.id} companion={companion} />
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
