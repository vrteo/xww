'use client';

import Navbar from '@/components/Navbar';
import VotingAppTemplate from '@/components/VotingAppTemplate';
import { votingApps } from '@/data/votingApps';
import { CalendarEvent } from '@/types/CalendarEvent';


export default function StarPlanetPage() {
    const app = votingApps.find(a => a.id === 'starplanet');

    if (!app) {
        return <div>App not found</div>;
    }

    const schedule = [
        {
            day: 'Tuesday',
            time: '6:00 PM',
            channel: 'SBS MTV',
            timezone: 'KST'
        },
        // Add more schedule slots as needed
    ];

    const currency = app.hasCurrency ? {
        name: 'Heart Jelly',
        description: 'Virtual currency used for voting in the app',
        howToCollect: [
            'Daily login bonus',
            'Watch ads',
            'Complete missions',
            'Purchase from store'
        ]
    } : undefined;

    const votingMethods = [
        'Open the app during live broadcast',
        'Select your favorite artist',
        'Use available heart jellies to vote',
        'One vote per account per show'
    ];

    const events: CalendarEvent[] = [
        {
            type: 'tracking',
            startDay: 0, // Monday
            endDay: 6 // Sunday
        },
        {
            type: 'prevote',
            startDay: 4, // Friday
            endDay: 0, // Monday
        },
        {
            type: 'live',
            startDay: 1, // Tuesday
            endDay: 1, // Tuesday (single day)
        }
    ];

    return (
        <div className="min-h-screen bg-gray-800 text-white">
            <Navbar />
            <div className="pt-20">
                <VotingAppTemplate
                    app={app}
                    schedule={schedule}
                    currency={currency}
                    votingMethods={votingMethods}
                    events={events}
                />
            </div>
        </div>
    );
}