'use client';

import { VotingAppTemplateProps} from '@/types/voting';
import Image from 'next/image';
import TwoWeekCalendar from './TwoWeekCalendar';
import EventCountdown from './EventCountdown';
import ExpandableTutorial from './ExpandableTutorial';


export default function VotingAppTemplate({
    app,
    schedule,
    currencies,
    votingMethods,
    events = []
}: VotingAppTemplateProps) {
    return (
        <div className="max-w-4xl mx-auto py-8 space-y-6">
            {/* App Header */}
            <section className="text-center">
                <div className="w-32 h-32 mx-auto relative mb-6">
                    <Image
                        src={app.icon}
                        alt={app.name}
                        fill
                        className="rounded-xl object-contain"
                        unoptimized
                        loader={({ src }) => src}
                    />
                </div>
                <h1 className="text-4xl font-bold mb-4">{app.name}</h1>
                <p className="text-xl text-gray-300">{app.musicShow}</p>
            </section>

            {/* Voting schedule */}
            <section className="bg-gray-900 rounded-lg p-6">
                <EventCountdown events={events} />
                <TwoWeekCalendar startDate={new Date()} events={events} />
                {app.scheduleInfo && (
                    <p className="text-sm text-gray-500 mt-4 italic whitespace-pre-line">
                        {app.scheduleInfo}
                    </p>
                )}
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

            {/* Currencies Section - Conditional Render */}
            {currencies && currencies.length > 0 && (
                <div className="space-y-6">
                    {currencies.map((currency, currencyIndex) => (
                        <section key={currencyIndex} className="bg-gray-900 rounded-lg p-6">
                            <h2 className="text-2xl font-semibold mb-4">{currency.name}</h2>
                            <p className="text-gray-300 mb-4">{currency.description}</p>
                            <h3 className="text-xl font-semibold mb-2">How to Collect</h3>
                            <div className="space-y-2">
                                {currency.howToCollect.map((method, index) => (
                                    <ExpandableTutorial
                                        key={index}
                                        name={method.name}
                                        steps={method.steps}
                                    />
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            )}

            {/* Voting Methods */}
            <section className="bg-gray-900 rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">How to Vote</h2>
                <div className="space-y-2">
                    {votingMethods.map((method, index) => (
                        <ExpandableTutorial
                            key={index}
                            name={method.name}
                            steps={method.steps}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}
