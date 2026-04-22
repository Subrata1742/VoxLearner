"use client"
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Navitem from './navitem';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Show, SignInButton, UserButton } from '@clerk/nextjs';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show at the very top (within 20px)
            if (currentScrollY < 20) {
                setIsVisible(true);
            }
            // Hide when scrolling down past the top
            else if (currentScrollY > lastScrollY) {
                setIsVisible(false);
            }
            // Show when scrolling up
            else {
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    // Hide navbar inside active companion calls
    if (pathname.startsWith('/companion/') && pathname !== '/companion/new') return null;
    if (pathname === '/sign-in') return null;

    return (
        <div className={`navbar-wrapper ${isVisible ? 'translate-y-0' : '-translate-y-[150%]'}`}>
            <nav className="navbar-container">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-3 group">
                            <div className="navbar-logo-ring">
                                <Image src="/logo 1.png" alt="Logo" fill className="object-cover" />
                            </div>
                            <span className="navbar-brand-text">
                                Vox Learner
                            </span>
                        </Link>
                    </div>

                    {/* Nav Items centered on desktop */}
                    <div className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2">
                        <Navitem />
                    </div>

                    <div className="flex items-center gap-2 md:gap-4">
                        {/* Nav Items on mobile */}
                        <div className="flex md:hidden mr-2">
                            <Navitem />
                        </div>
                        <header>
                            <Show when="signed-out">
                                <SignInButton>
                                    <Button className='navbar-signin-btn'>
                                        Sign In
                                    </Button>
                                </SignInButton>
                            </Show>
                            <Show when="signed-in">
                                <div className="navbar-user-btn">
                                    <UserButton />
                                </div>
                            </Show>
                        </header>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;