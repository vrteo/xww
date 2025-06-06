export type EventType = 'tracking' | 'prevote' | 'live';

export interface CalendarEvent {
    type: EventType;
    startDay: number;     // 0-6 for Monday-Sunday
    endDay: number;       // 0-6 for Monday-Sunday
    startTime?: string;   // Format: "HH:mm" in KST
    endTime?: string;     // Format: "HH:mm" in KST
}