'use client';

import Calendar from '@/components/Calendar';
import Navbar from '@/components/Navbar';
import VotingCarousel from '@/components/VotingCarousel';
import { votingApps } from '@/data/votingApps';

export default function VotingPage() {

    const events = [
        {
            id: '1',
            title: 'Team Meeting',
            startDate: new Date(2025, 5, 4),
            endDate: new Date(2025, 5, 6),
            color: 'blue'
        },
        // ... more events
    ];

    return (
        <div className="flex flex-col min-h-screen bg-gray-800 text-white">
            <Navbar />

            <main className="flex-grow container mx-auto px-4 pt-20">
                <h1 className="text-3xl font-bold mb-6 text-center">Voting Applications</h1>
                <VotingCarousel apps={votingApps} />

                {/* <Calendar
                    events={events}
                    onEventClick={(event) => console.log('Clicked event:', event)}
                /> */}
            </main>

            
        </div>
    );
}