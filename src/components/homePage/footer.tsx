"use client"
import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";
const Footer = () => {
    const pathname = usePathname();

    if ((pathname.startsWith('/companion/') && pathname !== '/companion/new') || pathname === '/sign-in') return null;

    return (
        <footer className="w-screen mt-24 border-t border-white/10 bg-black/20 backdrop-blur-xl relative overflow-hidden">

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#e94560]/10 blur-[120px] rounded-full -z-10"></div>

            <div className="max-w-7xl mx-auto px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-1 flex flex-col gap-6">
                        <Link href="/" className="flex items-center space-x-2 group">
                            <div className="relative w-10 h-10 border border-white/20 rounded-full overflow-hidden bg-white/5">
                                <Image src="/logo-removebg.png" alt="Logo" fill className="object-cover" />
                            </div>
                            <span className="font-extrabold text-transparent bg-clip-text bg-linear-to-r from-white to-[#e94560] text-xl tracking-wide">
                                Vox Learner
                            </span>
                        </Link>
                        <p className="text-white/60 text-sm leading-relaxed">
                            Empowering learners through real-time, voice-driven AI interaction. Master any subject naturally.
                        </p>
                        <div className="flex gap-4">
                            <Link href="https://github.com/Subrata1742" className="p-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-[#e94560] hover:border-[#e94560]/50 transition-all">
                                <Github size={20} />
                            </Link>
                            <Link href="#" className="p-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-[#e94560] hover:border-[#e94560]/50 transition-all">
                                <Twitter size={20} />
                            </Link>
                            <Link href="https://www.linkedin.com/in/subrata-nandi1742/" className="p-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-[#e94560] hover:border-[#e94560]/50 transition-all">
                                <Linkedin size={20} />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col gap-6">
                        <h4 className="text-white font-bold text-lg">Platform</h4>
                        <ul className="flex flex-col gap-3">
                            <li><Link href="/companion" className="text-white/50 hover:text-white transition-colors text-sm flex items-center gap-1">Explore Agents <ArrowUpRight size={14} /></Link></li>
                            <li><Link href="/companion/new" className="text-white/50 hover:text-white transition-colors text-sm flex items-center gap-1">Create Companion <ArrowUpRight size={14} /></Link></li>
                            <li><Link href="/subscription" className="text-white/50 hover:text-white transition-colors text-sm flex items-center gap-1">Pricing Plans <ArrowUpRight size={14} /></Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="flex flex-col gap-6">
                        <h4 className="text-white font-bold text-lg">Support</h4>
                        <ul className="flex flex-col gap-3">
                            <li><Link href="#" className="text-white/50 hover:text-white transition-colors text-sm">Documentation</Link></li>
                            <li><Link href="#" className="text-white/50 hover:text-white transition-colors text-sm">Privacy Policy</Link></li>
                            <li><Link href="#" className="text-white/50 hover:text-white transition-colors text-sm">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter/Contact */}
                    <div className="flex flex-col gap-6">
                        <h4 className="text-white font-bold text-lg">Stay Connected</h4>
                        <p className="text-white/50 text-sm">Subscribe to our newsletter for the latest AI updates.</p>
                        <div className="flex gap-2 p-1.5 rounded-xl bg-white/5 border border-white/10 focus-within:border-[#e94560]/50 transition-all">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="bg-transparent border-none outline-none text-white text-sm px-3 w-full"
                            />
                            <button className="bg-[#e94560] hover:bg-[#e94560]/80 text-white p-2 rounded-lg transition-colors">
                                <Mail size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-xs">
                    <p>© {new Date().getFullYear()} Vox Learner AI. All rights reserved.</p>
                    <p>Built with ❤️ for the future of education.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;