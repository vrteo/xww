'use client';

import Image from 'next/image';
import {useEffect, useState} from "react";
import hotLogo from './img/hot_wo_logo.png'

export default function Home() {
    const [isScrolled, setIsScrolled] = useState(false);

    // Tracks if page is scrolled beyond 50 pixels.
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header Section */}
            <header
                className={`fixed w-full py-4 z-10 transition-colors ${isScrolled ? 'bg-gray-950 text-white' : 'bg-transparent text-white'}`}>
                
                <div className="container mx-auto flex justify-between items-center px-4">
                    <div className="flex items-center space-x-2">
                        <Image src="/favicon.ico" alt="Favicon" width={32} height={32}/>
                        <h1 className="text-2xl font-bold">Xikers Worldwide</h1>
                    </div>

                    <nav>
                        <ul className="flex space-x-4">
                            <li>
                                Abcd
                            </li>
                            <li>
                                Defg
                            </li>
                            <li>
                                Ghij
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            {/* Background with action buttons */}
            <div
                className="relative h-screen bg-cover bg-bottom bg-[url(img/xikers_4_album_frontpage.png)]"
            >
                <div
                    className="absolute inset-0  flex flex-col justify-end items-center space-y-4 mb-16">

                    <Image src={hotLogo} alt="Hot Logo" width={350} height={128}/>
                    <div className="flex space-x-4">
                        <button className="px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700">
                            Get Started
                        </button>
                        <button className="px-6 py-2 bg-gray-500 text-white font-semibold rounded hover:bg-gray-700">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <footer className="bg-gray-800 text-white py-4">
                <div className="container mx-auto text-center">
                    <p className="text-sm">&copy; {new Date().getFullYear()} My Landing Page. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}