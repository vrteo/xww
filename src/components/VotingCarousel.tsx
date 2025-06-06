'use client';

import { VotingApp } from '@/types/voting';
import Image from 'next/image';
import { useState } from 'react';

interface VotingCarouselProps {
    apps: VotingApp[];
}

export default function VotingCarousel({ apps }: VotingCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % apps.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + apps.length) % apps.length);
    };

    return (
        <div className="relative w-full max-w-4xl mx-auto pb-8"> {/* Added pb-12 here */}
            <div className="overflow-hidden rounded-lg shadow-xl">
                <div className="relative h-[400px] bg-gray-800">
                    <div 
                        className="flex transition-transform duration-500 ease-in-out h-full"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {apps.map((app) => (
                            <div 
                                key={app.id}
                                className="flex-shrink-0 w-full h-full flex items-center justify-center p-8"
                            >
                                <div className="text-center">
                                    <div className="w-32 h-32 mx-auto mb-4 relative">
                                        <Image
                                            src={app.icon}
                                            alt={app.name}
                                            fill
                                            className="rounded-lg object-contain"
                                            unoptimized // Add this to bypass image optimization for external URLs
                                            loader={({ src }) => src} // Add custom loader for external URLs
                                        />
                                    </div>
                                    <h2 className="text-2xl font-bold text-white mb-2">
                                        {app.name}
                                    </h2>
                                    <p className="text-gray-300 mb-4">
                                        {app.musicShow}
                                    </p>
                                    <p className="text-gray-400 mb-6">
                                        {app.description}
                                    </p>
                                    <a
                                        href={app.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                                    >
                                        Open App
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-r-lg hover:bg-black/75"
            >
                ←
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-l-lg hover:bg-black/75"
            >
                →
            </button>

            {/* Updated pagination positioning */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center gap-2 pb-10">
                <div className="flex gap-1">
                    {apps.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2 h-2 rounded-full transition-colors ${
                                index === currentIndex ? 'bg-blue-500' : 'bg-gray-400'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
