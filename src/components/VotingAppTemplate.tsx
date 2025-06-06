'use client';

import { VotingApp } from '@/types/voting';
import Image from 'next/image';
import TwoWeekCalendar from './TwoWeekCalendar';
import { CalendarEvent } from '@/types/CalendarEvent';

interface VotingCurrencyInfo {
    name: string;
    description: string;
    howToCollect: string[];
}

interface ShowSchedule {
    day: string;
    time: string;
    channel: string;
    timezone: string;
}

interface VotingAppTemplateProps {
    app: VotingApp;
    schedule: ShowSchedule[];
    currency?: VotingCurrencyInfo;
    votingMethods: string[];
    events: CalendarEvent[];
}

export default function VotingAppTemplate({
    app,
    schedule,
    currency,
    votingMethods,
    events = []
}: VotingAppTemplateProps) {
    return (
        <div className="max-w-4xl mx-auto py-8 space-y-12">
            {/* App Header */}
            <section className="text-center">
                <div className="w-32 h-32 mx-auto relative mb-6">
                    <Image
                        src={app.icon}
                        alt={app.name}
                        fill
                        className="rounded-xl object-contain"
                        unoptimized // Add this to bypass image optimization for external URLs
                        loader={({ src }) => src}
                    />
                </div>
                <h1 className="text-4xl font-bold mb-4">{app.name}</h1>
                <p className="text-xl text-gray-300 mb-4">{app.musicShow}</p>
                <a
                    href={app.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Open App
                </a>
            </section>

            {/* Voting schedule */}
            <section className="bg-gray-900 rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">Voting Schedule</h2>
                <TwoWeekCalendar startDate={new Date()} events={events} />
            </section>

            {/* Show Schedule */}
            <section className="bg-gray-900 rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">Show Schedule</h2>
                <div className="space-y-4">
                    {schedule.map((slot, index) => (
                        <div key={index} className="flex justify-between items-center border-b border-gray-700 pb-4 last:border-0">
                            <div>
                                <p className="font-medium">{slot.day}</p>
                                <p className="text-gray-300">{slot.time} {slot.timezone}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-blue-400">{slot.channel}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Currency Section - Conditional Render */}
            {currency && (
                <section className="bg-gray-900 rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4">About {currency.name}</h2>
                    <p className="text-gray-300 mb-4">{currency.description}</p>
                    <h3 className="text-xl font-semibold mb-2">How to Collect</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                        {currency.howToCollect.map((method, index) => (
                            <li key={index}>{method}</li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Voting Methods */}
            <section className="bg-gray-900 rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">How to Vote</h2>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                    {votingMethods.map((method, index) => (
                        <li key={index}>{method}</li>
                    ))}
                </ul>
            </section>
        </div>
    );
}