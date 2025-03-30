'use client';

import Image from 'next/image';
import {useEffect, useState} from "react";
// import hotLogo from './img/hot_wo_logo.png';
import pfp from './img/PFP.png';

export default function Home() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isNavExpanded, setIsNavExpanded] = useState(false);

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
            <header className={`fixed w-full py-4 z-10 transition-colors ${isScrolled ? 'bg-gray-950 text-white' : 'bg-transparent text-white'}`}>
                <div className="container mx-auto flex justify-between items-center px-4">
                    <div className="flex items-center space-x-2">
                        <Image src={pfp} alt="Icon" width={36} height={36}/>
                        <h1 className="text-2xl font-bold">Xikers Worldwide</h1>
                    </div>

                    <nav>
                        {/* Button to toggle navbar */}
                        <button
                            type="button"
                            onClick={() => setIsNavExpanded(!isNavExpanded)} // Toggle navbar
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="navbar-default"
                            aria-expanded={isNavExpanded}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                            </svg>
                        </button>

                        <div
                            className={`${isNavExpanded ? 'block' : 'hidden'} w-full md:block md:w-auto`}
                            id="navbar-default"
                        >
                            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4
                            md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">

                                <li>
                                    Discover
                                </li>
                                <li>
                                    Voting
                                </li>
                                <li>
                                    Streaming
                                </li>
                                <li>
                                    Projects
                                </li>
                                <li>
                                    About us
                                </li>
                                <li>
                                    Donate
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>

            {/*/!* Background with action buttons *!/*/}
            {/*<div className="relative h-screen bg-cover bg-bottom lg:bg-bottom bg-[url(img/xikers_4_album_frontpage.png)]">*/}
            <div className="flex items-center justify-center h-screen bg-gray-200">
                <h1 className="text-4xl font-bold text-gray-700">Page under construction</h1>
            </div>
            {/*    <div className="absolute inset-0  flex flex-col justify-center lg:justify-end items-center space-y-4 mb-16">*/}
            {/*        <Image src={hotLogo} alt="Hot Logo" width={350} height={128}/>*/}
            {/*        <div className="flex space-x-4">*/}
            {/*            <button className="px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700">*/}
            {/*                Get Started*/}
            {/*            </button>*/}
            {/*            <button className="px-6 py-2 bg-gray-500 text-white font-semibold rounded hover:bg-gray-700">*/}
            {/*                Learn More*/}
            {/*            </button>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            
            

            {/* Footer Section */}
            <footer className="bg-gray-950 text-white py-4">
                <div className="container mx-auto text-center">
                    <p className="text-sm">&copy; {new Date().getFullYear()} Xikers Worldwide Fanbase. All rights
                        reserved.</p>
                </div>
            </footer>
        </div>
    );
}