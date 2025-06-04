'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed w-full py-4 z-10 transition-colors ${isScrolled ? 'bg-gray-950 text-white' : 'bg-transparent text-white'}`}>
            <div className="container mx-auto flex justify-between items-center px-4">
                <div className="flex items-center space-x-2">
                    <Image src="/favicon.ico" alt="Favicon" width={32} height={32}/>
                    <h1 className="text-2xl font-bold">Xikers Worldwide</h1>
                </div>

                {/* Hamburger Menu Button */}
                <button 
                    className="lg:hidden p-2 hover:bg-gray-800 rounded"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <div className="w-6 h-5 flex flex-col justify-between">
                        <span className={`block h-0.5 w-full bg-white transform transition duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                        <span className={`block h-0.5 w-full bg-white transition duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                        <span className={`block h-0.5 w-full bg-white transform transition duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </div>
                </button>

                {/* Desktop Navigation */}
                <nav className="hidden lg:block">
                    <ul className="flex space-x-4">
                        <li>
                            <Link href="/" className="hover:text-gray-300 transition-colors">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/voting" className="hover:text-gray-300 transition-colors">
                                Voting
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Mobile Navigation - Updated with animations */}
            <nav 
                className={`lg:hidden absolute left-0 right-0 bg-gray-950 border-t border-gray-800 transition-all duration-300 ease-in-out overflow-hidden ${
                    isMenuOpen 
                        ? 'max-h-[200px] opacity-100' 
                        : 'max-h-0 opacity-0'
                }`}
            >
                <ul className="py-4 px-4 space-y-4">
                    <li>
                        <Link 
                            href="/" 
                            className="block hover:text-gray-300 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href="/voting" 
                            className="block hover:text-gray-300 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Voting
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}