'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface TutorialStep {
    image: string;
    description: string;
}

interface ExpandableTutorialProps {
    name: string;
    steps: TutorialStep[];
}

export default function ExpandableTutorial({ name, steps }: ExpandableTutorialProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedStep, setSelectedStep] = useState<number | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setSelectedStep(null);
            }
        };

        if (selectedStep !== null) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [selectedStep]);

    const showNextStep = () => {
        if (selectedStep !== null && selectedStep < steps.length - 1) {
            setSelectedStep(selectedStep + 1);
        }
    };

    const showPreviousStep = () => {
        if (selectedStep !== null && selectedStep > 0) {
            setSelectedStep(selectedStep - 1);
        }
    };

    return (
        <div className="border-b border-gray-700 last:border-0">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full py-4 flex items-center justify-between text-left"
            >
                <span className="text-gray-300">{name}</span>
                <ChevronDownIcon 
                    className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 
                        ${isExpanded ? 'rotate-180' : ''}`}
                />
            </button>
            
            {isExpanded && (
                <div className="pb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {steps.map((step, index) => (
                            <div 
                                key={index} 
                                className="flex flex-col gap-2 p-2 rounded-lg transition-colors duration-200 hover:bg-gray-800/50 cursor-pointer"
                                onClick={() => setSelectedStep(index)}
                            >
                                <div className="relative h-64 w-full rounded-lg overflow-hidden">
                                    <div className="absolute top-2 left-2 bg-gray-900/80 text-white px-2 py-1 rounded-md text-sm font-medium z-10">
                                        {index + 1}
                                    </div>
                                    <Image
                                        src={step.image}
                                        alt={`Step ${index + 1}`}
                                        fill
                                        className="object-contain bg-gray-800"
                                        unoptimized
                                        loader={({ src }) => src}
                                    />
                                </div>
                                <p className="text-sm text-gray-400">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Modal */}
            {selectedStep !== null && (
                <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
                    <div ref={modalRef} className="bg-gray-900 p-4 rounded-lg max-w-4xl w-full mx-4 relative">
                        <button 
                            onClick={() => setSelectedStep(null)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-300"
                        >
                            <XMarkIcon className="w-6 h-6" />
                        </button>

                        <div className="flex items-center gap-4">
                            <button 
                                onClick={showPreviousStep}
                                disabled={selectedStep === 0}
                                className="p-2 rounded-full hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeftIcon className="w-6 h-6 text-gray-400" />
                            </button>

                            <div className="flex-1">
                                <div className="relative h-[70vh] w-full rounded-lg overflow-hidden mb-4">
                                    <Image
                                        src={steps[selectedStep].image}
                                        alt={`Step ${selectedStep + 1}`}
                                        fill
                                        className="object-contain bg-gray-800"
                                        unoptimized
                                        loader={({ src }) => src}
                                    />
                                </div>
                                <div className="text-center">
                                    <div className="text-sm text-gray-400 mb-2">
                                        Step {selectedStep + 1} of {steps.length}
                                    </div>
                                    <p className="text-gray-300">{steps[selectedStep].description}</p>
                                </div>
                            </div>

                            <button 
                                onClick={showNextStep}
                                disabled={selectedStep === steps.length - 1}
                                className="p-2 rounded-full hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronRightIcon className="w-6 h-6 text-gray-400" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}