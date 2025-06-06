export type EventType = 'tracking' | 'prevote' | 'live';

export interface CalendarEvent {
    type: EventType;
    startDay: number; // 0-6 (Monday-Sunday)
    endDay: number; // 0-6 (Monday-Sunday)
}