import { CalendarEvent } from '@/types/CalendarEvent';
import CalendarDay from '@/components/CalendarDay';

interface CalendarGridProps {
    currentDate: Date;
    events: CalendarEvent[];
    onEventClick?: (event: CalendarEvent) => void;
}

export default function CalendarGrid({ currentDate, events, onEventClick }: CalendarGridProps) {
    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="grid grid-cols-7 gap-px bg-gray-700">
            {weekDays.map(day => (
                <div key={day} className="bg-gray-800 p-2 text-center text-sm font-medium text-gray-300">
                    {day}
                </div>
            ))}
            
            {Array(firstDayOfMonth).fill(null).map((_, index) => (
                <div key={`empty-${index}`} className="bg-gray-900 p-2 min-h-[100px]" />
            ))}

            {days.map(day => {
                const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                const dayEvents = events.filter(event => {
                    return date >= new Date(event.startDate.setHours(0,0,0,0)) && 
                           date <= new Date(event.endDate.setHours(23,59,59,999));
                });

                return (
                    <CalendarDay 
                        key={day}
                        day={day}
                        events={dayEvents}
                        onEventClick={onEventClick}
                    />
                );
            })}
        </div>
    );
}