"use client"
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Navitem from './navitem';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
const Navbar = () => {
    const pathname = usePathname();
    if (pathname.startsWith('/companion/')) return null;
    if (pathname === '/sign-in') return null;

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-b-slate-700 bg-transparent backdrop-blur-xs ">
            <div className="container flex h-14 items-center justify-between px-1.5 md:px-8 mx-auto">
                <div className="flex items-center gap-6 mx-2">
                    <Link href="/" className="flex items-center space-x-2">
                        <Image src="/logo 1.png" alt="Logo" className='rounded-full' width={50} height={50} />
                        <span className="font-bold text-white text-lg hidden sm:inline-block">
                            Vox Learner
                        </span>
                    </Link>

                </div>
                <div className="flex items-center gap-2 ">
                    <Navitem />
                    <Button asChild variant="default" className='mx-2' size="sm">
                        <Link href="/sign-in">Sign In</Link>
                    </Button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;