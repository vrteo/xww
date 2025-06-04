interface CalendarHeaderProps {
    currentDate: Date;
    onPrevMonth: () => void;
    onNextMonth: () => void;
}

export default function CalendarHeader({ currentDate, onPrevMonth, onNextMonth }: CalendarHeaderProps) {
    const monthYear = currentDate.toLocaleString('default', { 
        month: 'long', 
        year: 'numeric' 
    });

    return (
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <button 
                onClick={onPrevMonth}
                className="p-2 text-gray-300 hover:bg-gray-800 rounded-lg"
            >
                ←
            </button>
            <h2 className="text-xl font-semibold text-gray-100">{monthYear}</h2>
            <button 
                onClick={onNextMonth}
                className="p-2 text-gray-300 hover:bg-gray-800 rounded-lg"
            >
                →
            </button>
        </div>
    );
}