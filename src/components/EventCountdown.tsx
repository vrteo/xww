'use client';

import { CalendarEvent, EventType } from '@/types/CalendarEvent';
import { useEffect, useState } from 'react';

const EVENT_COLORS: Record<EventType, string> = {
    tracking: 'text-purple-400',
    prevote: 'text-amber-400',
    live: 'text-red-400'
};

const EVENT_DISPLAY_NAMES: Record<EventType, string> = {
    tracking: 'Tracking',
    prevote: 'Prevote',
    live: 'Live Vote'
};

interface EventCountdownProps {
    events: CalendarEvent[];
}

interface EventStatus {
    event: CalendarEvent;
    countdown: string;
    isActive: boolean;
    start: Date;
}

export default function EventCountdown({ events }: EventCountdownProps) {
    const [eventStatuses, setEventStatuses] = useState<EventStatus[]>([]);

    const getMonday = (date: Date): Date => {
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(date.setDate(diff));
    };

    const formatCountdown = (ms: number) => {
        const minutes = Math.floor((ms / (1000 * 60)) % 60);
        const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
        const days = Math.floor(ms / (1000 * 60 * 60 * 24));

        return `${days}d ${hours}h ${minutes}m`;
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const statuses: EventStatus[] = [];
            const monday = getMonday(new Date(now));
            // Track which event types are active
            const activeTypes = new Set<EventType>();

            // First pass: find active events
            for (const event of events) {
                for (let weekOffset = -1; weekOffset <= 1; weekOffset++) {
                    const instanceStart = new Date(monday);
                    instanceStart.setDate(monday.getDate() + (event.startDay + (weekOffset * 7)));
                    
                    const instanceEnd = new Date(monday);
                    instanceEnd.setDate(monday.getDate() + (event.endDay + (weekOffset * 7)));

                    // Handle week wrap-around
                    if (event.startDay > event.endDay) {
                        instanceEnd.setDate(instanceEnd.getDate() + 7);
                    }

                    // Set the correct times
                    const [startHour, startMin] = event.startTime?.split(':').map(Number) || [0, 0];
                    const [endHour, endMin] = event.endTime?.split(':').map(Number) || [23, 59];
                    
                    instanceStart.setHours(startHour, startMin, 0, 0);
                    instanceEnd.setHours(endHour, endMin, 0, 0);

                    const isActive = now >= instanceStart && now <= instanceEnd;
                    
                    if (isActive) {
                        activeTypes.add(event.type);
                        statuses.push({
                            event,
                            countdown: formatCountdown(instanceEnd.getTime() - now.getTime()),
                            isActive: true,
                            start: instanceStart
                        });
                    }
                }
            }

            // Second pass: add future events only for types that aren't active
            for (const event of events) {
                // Skip if we already have an active event of this type
                if (activeTypes.has(event.type)) continue;

                for (let weekOffset = -1; weekOffset <= 1; weekOffset++) {
                    const instanceStart = new Date(monday);
                    instanceStart.setDate(monday.getDate() + (event.startDay + (weekOffset * 7)));
                    
                    const instanceEnd = new Date(monday);
                    instanceEnd.setDate(monday.getDate() + (event.endDay + (weekOffset * 7)));

                    // Handle week wrap-around
                    if (event.startDay > event.endDay) {
                        instanceEnd.setDate(instanceEnd.getDate() + 7);
                    }

                    // Set the correct times
                    const [startHour, startMin] = event.startTime?.split(':').map(Number) || [0, 0];
                    const [endHour, endMin] = event.endTime?.split(':').map(Number) || [23, 59];
                    
                    instanceStart.setHours(startHour, startMin, 0, 0);
                    instanceEnd.setHours(endHour, endMin, 0, 0);

                    const isActive = now >= instanceStart && now <= instanceEnd;
                    
                    if (!isActive && now < instanceStart) {
                        statuses.push({
                            event,
                            countdown: formatCountdown(instanceStart.getTime() - now.getTime()),
                            isActive: false,
                            start: instanceStart
                        });
                        // Only add the first future event for this type
                        break;
                    }
                }
            }

            // Sort by active first, then by start time
            statuses.sort((a, b) => {
                if (a.isActive && !b.isActive) return -1;
                if (!a.isActive && b.isActive) return 1;
                return a.start.getTime() - b.start.getTime();
            });

            setEventStatuses(statuses);
        }, 1000);

        return () => clearInterval(interval);
    }, [events]);

    if (eventStatuses.length === 0) return null;

    return (
        <div className="bg-gray-900 rounded-lg p-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {eventStatuses.map((status, index) => (
                    <div 
                        key={`${status.event.type}-${index}`}
                        className={`
                            bg-gray-800/50 rounded-lg p-4 flex flex-col items-center
                            ${status.isActive ? `ring-2 ring-opacity-50 ring-offset-2 ring-offset-gray-900 ${EVENT_COLORS[status.event.type].replace('text-', 'ring-')}` : ''}
                        `}
                    >
                        <div className="text-center">
                            <p className={`text-lg font-medium ${EVENT_COLORS[status.event.type]}`}>
                                {EVENT_DISPLAY_NAMES[status.event.type]}
                            </p>
                            <p className="text-2xl font-bold mt-2">
                                {status.countdown}
                            </p>
                            <p className="text-sm text-gray-400 mt-1">
                                {status.isActive ? 'Time Remaining' : 'Time Until Start'}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}