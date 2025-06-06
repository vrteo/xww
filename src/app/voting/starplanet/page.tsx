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

    const currencies = app.hasCurrency ? [
        {
            name: 'Heart Jelly',
            description: 'Virtual currency used for voting in the app',
            howToCollect: [
                {
                    name: 'Daily Login',
                    steps: [
                        {
                            image: "/images/tutorials/daily-1.jpg",
                            description: "Open the app and click on the Daily Check-in button"
                        },
                        {
                            image: "/images/tutorials/daily-2.jpg",
                            description: "Claim your daily Heart Jelly reward"
                        }
                    ]
                },
                {
                    name: 'Watch Ads',
                    steps: [
                        {
                            image: "/images/tutorials/ads-1.jpg",
                            description: "Go to the Heart Jelly section"
                        },
                        {
                            image: "/images/tutorials/ads-2.jpg",
                            description: "Click on Watch Ad to earn Heart Jelly"
                        }
                    ]
                },
                {
                    name: 'Complete Missions',
                    steps: [
                        {
                            image: "/images/tutorials/missions-1.jpg",
                            description: "Navigate to the Missions tab"
                        },
                        {
                            image: "/images/tutorials/missions-2.jpg",
                            description: "Complete available missions to earn Heart Jelly"
                        }
                    ]
                },
                {
                    name: 'Purchase from Store',
                    steps: [
                        {
                            image: "/images/tutorials/store-1.jpg",
                            description: "Open the Store section"
                        },
                        {
                            image: "/images/tutorials/store-2.jpg",
                            description: "Select a Heart Jelly package to purchase"
                        }
                    ]
                }
            ]
        },
        {
            name: 'Star Planet Points',
            description: 'Additional currency earned through app engagement',
            howToCollect: [
                {
                    name: 'Daily Check-in',
                    steps: [
                        {
                            image: "/images/tutorials/dailycheckin-1.jpg",
                            description: "Log in to the app daily to receive Star Planet Points"
                        },
                        {
                            image: "/images/tutorials/dailycheckin-2.jpg",
                            description: "Check the Star Planet Points balance in your profile"
                        }
                    ]
                },
                {
                    name: 'Engagement Rewards',
                    steps: [
                        {
                            image: "/images/tutorials/engagement-1.jpg",
                            description: "Participate in events and activities within the app"
                        },
                        {
                            image: "/images/tutorials/engagement-2.jpg",
                            description: "Earn Star Planet Points based on your engagement level"
                        }
                    ]
                }
            ]
        }
    ] : undefined;

    const votingMethods = [
    {
        name: "Vote using hearts",
        steps: [
            {
                image: "/img/tutorials/starplanet/voting/voting-1.png",
                description: "Open the app and go to the voting section"
            },
            {
                image: "/img/tutorials/starplanet/voting/voting-1.png",
                description: "Open the app and go to the voting section"
            },
            {
                image: "/img/tutorials/starplanet/voting/voting-1.png",
                description: "Open the app and go to the voting section"
            },
            {
                image: "/img/tutorials/starplanet/voting/voting-1.png",
                description: "Open the app and go to the voting section"
            },
            {
                image: "/img/tutorials/starplanet/voting/voting-1.png",
                description: "Open the app and go to the voting section Open the app and go to the voting section Open the app and go to the voting section"
            },
            // ... more steps
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