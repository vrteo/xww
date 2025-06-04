import { CalendarEvent } from '@/types/CalendarEvent';

interface CalendarDayProps {
    day: number;
    events: CalendarEvent[];
    onEventClick?: (event: CalendarEvent) => void;
}

export default function CalendarDay({ day, events, onEventClick }: CalendarDayProps) {
    return (
        <div className="bg-gray-900 p-2 min-h-[100px] border-t border-gray-700">
            <div className="font-medium mb-1 text-gray-300">{day}</div>
            <div className="space-y-1">
                {events.map(event => (
                    <div
                        key={event.id}
                        onClick={() => onEventClick?.(event)}
                        className={`text-xs p-1 rounded truncate cursor-pointer ${
                            event.color 
                                ? `bg-${event.color}-900 text-${event.color}-100 hover:bg-${event.color}-800` 
                                : 'bg-blue-900 text-blue-100 hover:bg-blue-800'
                        }`}
                    >
                        {event.title}
                    </div>
                ))}
            </div>
        </div>
    );
}