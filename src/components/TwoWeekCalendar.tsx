'use client';

import { CalendarEvent, EventType } from '@/types/CalendarEvent';

interface TwoWeekCalendarProps {
    startDate?: Date;
    events?: CalendarEvent[];
}

interface EventInstance {
    type: EventType;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
}

const EVENT_COLORS: Record<EventType, { bg: string; text: string; inactiveBg: string; inactiveText: string }> = {
    tracking: {
        bg: 'bg-purple-950/50',
        text: 'text-purple-300',
        inactiveBg: 'bg-purple-950/20',
        inactiveText: 'text-purple-300/50'
    },
    prevote: {
        bg: 'bg-amber-950/50',
        text: 'text-amber-300',
        inactiveBg: 'bg-amber-950/20',
        inactiveText: 'text-amber-300/50'
    },
    live: {
        bg: 'bg-red-950/50',
        text: 'text-red-300',
        inactiveBg: 'bg-red-950/20',
        inactiveText: 'text-red-300/50'
    }
};

const EVENT_DISPLAY_NAMES: Record<EventType, string> = {
    tracking: 'tracking',
    prevote: 'prevote',
    live: 'live vote'
};

export default function TwoWeekCalendar({ startDate = new Date(), events = [] }: TwoWeekCalendarProps) {
    const getMonday = (date: Date): Date => {
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
        return new Date(date.setDate(diff));
    };

    const generateDays = (start: Date): Date[] => {
        const days: Date[] = [];
        const monday = getMonday(new Date(start));
        
        for (let i = 0; i < 14; i++) {
            const day = new Date(monday);
            day.setDate(monday.getDate() + i);
            days.push(day);
        }
        
        return days;
    };

    const calculateEventInstances = (event: CalendarEvent, calendarStartDate: Date, calendarEndDate: Date): EventInstance[] => {
        const instances: EventInstance[] = [];
        const monday = getMonday(new Date(calendarStartDate));
        
        // Create three potential instances: past, current, future
        for (let weekOffset = -1; weekOffset <= 1; weekOffset++) {
            const instanceStart = new Date(monday);
            instanceStart.setDate(monday.getDate() + (event.startDay + (weekOffset * 7)));
            
            const instanceEnd = new Date(monday);
            instanceEnd.setDate(monday.getDate() + (event.endDay + (weekOffset * 7)));

            // Handle week wrap-around
            if (event.startDay > event.endDay) {
                instanceEnd.setDate(instanceEnd.getDate() + 7);
            }

            // Only add instance if it overlaps with our calendar view
            if (instanceEnd >= calendarStartDate && instanceStart <= calendarEndDate) {
                instances.push({
                    type: event.type,
                    startDate: instanceStart,
                    endDate: instanceEnd,
                    isActive: today >= instanceStart && today <= instanceEnd
                });
            }
        }

        return instances;
    };

    const days = generateDays(startDate);
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const today = new Date();

    const getEventsForDay = (date: Date): EventInstance[] => {
        const calendarStart = days[0];
        const calendarEnd = days[days.length - 1];
        
        const allInstances = events.flatMap(event => 
            calculateEventInstances(event, calendarStart, calendarEnd)
        );

        return allInstances.filter(instance => 
            date >= instance.startDate && date <= instance.endDate
        );
    };

    return (
        <div className="bg-gray-900 rounded-lg shadow-xl">
            <div className="p-4">
                <div className="grid grid-cols-7 gap-1">
                    {/* Weekday headers */}
                    {weekDays.map(day => (
                        <div 
                            key={day} 
                            className="text-center text-sm font-medium text-gray-300 py-2"
                        >
                            {day}
                        </div>
                    ))}

                    {/* Calendar days */}
                    {days.map((day, index) => (
                        <div 
                            key={index}
                            className={`
                                border rounded-lg flex flex-col
                                transition-all duration-200
                                aspect-[1/1.5] sm:aspect-square p-2
                                ${day.toDateString() === today.toDateString() 
                                    ? 'border-blue-500 ring-2 ring-blue-500 ring-opacity-50 hover:ring-blue-400 hover:ring-opacity-75 hover:border-blue-400' 
                                    : 'border-gray-700 hover:border-gray-600'
                                }
                            `}
                        >
                            <span className={`
                                ${day.toDateString() === today.toDateString()
                                    ? 'text-blue-400 font-medium'
                                    : day < today ? 'text-gray-500' : 'text-gray-300'
                                }
                            `}>
                                {day.getDate()}
                            </span>
                            <div className="flex flex-col gap-0.5 mt-1">
                                {getEventsForDay(day).map((event, eventIndex) => (
                                    <span
                                        key={eventIndex}
                                        className={`
                                            text-xs px-1 py-0.5 rounded
                                            ${event.isActive 
                                                ? EVENT_COLORS[event.type].bg 
                                                : EVENT_COLORS[event.type].inactiveBg}
                                            ${event.isActive 
                                                ? EVENT_COLORS[event.type].text 
                                                : EVENT_COLORS[event.type].inactiveText}
                                        `}
                                    >
                                        {EVENT_DISPLAY_NAMES[event.type]}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}