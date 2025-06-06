'use client';

import Navbar from '@/components/Navbar';
import VotingAppTemplate from '@/components/VotingAppTemplate';
import { votingApps } from '@/data/votingApps';
import { CalendarEvent } from '@/types/CalendarEvent';


export default function IdolChampPage() {
    const app = votingApps.find(a => a.id === 'mnet');

    if (!app) {
        return <div>App not found</div>;
    }

    const schedule = [
        {
            day: 'Day',
            time: '6:00 PM',
            channel: 'Channel',
            timezone: 'KST'
        },
        // Add more schedule slots as needed
    ];

    const currencies = app.hasCurrency ? [
        {
            name: 'Currency 1',
            description: 'Description 1',
            howToCollect: [
                {
                    name: 'Method 1',
                    steps: [
                        {
                            image: "/img/tutorials/appname/collecting/method1-step1.png",
                            description: "Description 1"
                        },
                        {
                            image: "/img/tutorials/appname/collecting/method1-step2.png",
                            description: "Description 2"
                        }
                    ]
                },
                {
                    name: 'Method 2',
                    steps: [
                        {
                            image: "/img/tutorials/appname/collecting/method2-step1.png",
                            description: "Description 1"
                        },
                        {
                            image: "/img/tutorials/appname/collecting/method2-step2.png",
                            description: "Description 2"
                        }
                    ]
                },
            ]
        },
        {
            name: 'Currency 2',
            description: 'Description 1',
            howToCollect: [
                {
                    name: 'Method 3',
                    steps: [
                        {
                            image: "/img/tutorials/appname/collecting/method3-step1.png",
                            description: "Description 1"
                        },
                        {
                            image: "/img/tutorials/appname/collecting/method3-step2.png",
                            description: "Description 2"
                        }
                    ]
                },
                {
                    name: 'Method 4',
                    steps: [
                        {
                            image: "/img/tutorials/appname/collecting/method4-step1.png",
                            description: "Description 1"
                        },
                        {
                            image: "/img/tutorials/appname/collecting/method4-step2.png",
                            description: "Description 2"
                        }
                    ]
                },
            ]
        },
    ] : undefined;

    const votingMethods = [
    {
        name: "Voting 1",
        steps: [
            {
                image: "/img/tutorials/appname/voting/method1-step1.png",
                description: "Description 1"
            },
            {
                image: "/img/tutorials/appname/voting/method1-step2.png",
                description: "Description 2"
            },
        ]
    },
    {
        name: "Voting 2",
        steps: [
            {
                image: "/img/tutorials/appname/voting/method2-step1.png",
                description: "Description 1"
            },
            {
                image: "/img/tutorials/appname/voting/method2-step2.png",
                description: "Description 2"
            },
        ]
    }
];

    const events: CalendarEvent[] = [
        {
            type: 'tracking',
            startDay: 0, // Monday
            endDay: 6,  // Sunday
            startTime: "00:00",
            endTime: "23:59"
        },
        {
            type: 'prevote',
            startDay: 4, // Friday
            endDay: 0,  // Monday
            startTime: "20:00",
            endTime: "13:59"
        },
        {
            type: 'live',
            startDay: 1, // Tuesday
            endDay: 1,  // Tuesday
            startTime: "18:00",
            endTime: "19:00"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-800 text-white">
            <Navbar />
            <div className="pt-20">
                <VotingAppTemplate
                    app={app}
                    schedule={schedule}
                    currencies={currencies}
                    votingMethods={votingMethods}
                    events={events}
                />
            </div>
        </div>
    );
}