import { CalendarEvent } from "./CalendarEvent";

export interface VotingApp {
    id: string;
    name: string;
    icon: string;
    musicShow: string;
    description: string;
    link: string;
    hasCurrency: boolean;
    scheduleInfo: string;
}

interface TutorialStep {
    image: string;
    description: string;
}

interface CollectionMethod {
    name: string;
    steps: TutorialStep[];
}

interface VotingMethod {
    name: string;
    steps: TutorialStep[];
}

interface ShowSchedule {
    day: string;
    time: string;
    channel: string;
    timezone: string;
}

export interface VotingCurrencyInfo {
    name: string;
    description: string;
    howToCollect: CollectionMethod[];
}

export interface VotingAppTemplateProps {
    app: VotingApp;
    schedule: ShowSchedule[];
    currencies?: VotingCurrencyInfo[];  // Changed from single currency to array
    votingMethods: VotingMethod[];
    events: CalendarEvent[];
}