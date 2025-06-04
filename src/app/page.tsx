
'use client';

import Image from 'next/image';
import hotLogo from '@/img/hot_wo_logo.png';
import Navbar from '@/components/Navbar';
import bgImage from '@/img/xikers_4_album_frontpage.png';

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            {/* Background with action buttons */}
            <div className="relative h-screen bg-cover bg-bottom" style={{ backgroundImage: `url(${bgImage.src})` }}>
                <div className="absolute inset-0 flex flex-col justify-end items-center space-y-4 mb-16">
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
        </div>
    );
}