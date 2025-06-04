'use client';

import { useState } from 'react';
import { CalendarEvent } from '@/types/CalendarEvent';
import CalendarHeader from '@/components/CalendarHeader';
import CalendarGrid from '@/components/CalendarGrid';

interface CalendarProps {
    events: CalendarEvent[];
    onEventClick?: (event: CalendarEvent) => void;
}

export default function Calendar({ events, onEventClick }: CalendarProps) {
    const [currentDate, setCurrentDate] = useState(new Date());

    const handlePrevMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    };

    return (
        <div className="bg-gray-900 rounded-lg shadow">
            <CalendarHeader 
                currentDate={currentDate}
                onPrevMonth={handlePrevMonth}
                onNextMonth={handleNextMonth}
            />
            <CalendarGrid 
                currentDate={currentDate}
                events={events}
                onEventClick={onEventClick}
            />
        </div>
    );
}