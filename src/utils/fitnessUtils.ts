import { DayFocus } from '../types/fitness.types';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const SCHEDULE: Record<string, DayFocus> = {
    Monday: { type: 'Push', icon: '🔥', muscles: 'Chest • Shoulders • Triceps', color: '#60a5fa' },
    Tuesday: { type: 'Pull', icon: '💪', muscles: 'Back • Biceps', color: '#f472b6' },
    Wednesday: { type: 'Legs', icon: '🦵', muscles: 'Quads • Glutes • Calves', color: '#fbbf24' },
    Thursday: { type: 'Push', icon: '🔥', muscles: 'Chest • Shoulders • Triceps', color: '#60a5fa' },
    Friday: { type: 'Pull', icon: '💪', muscles: 'Back • Biceps', color: '#f472b6' },
    Saturday: { type: 'Legs', icon: '🦵', muscles: 'Quads • Glutes • Calves', color: '#fbbf24' },
    Sunday: { type: 'Rest', icon: '🛌', muscles: 'Active Recovery', color: '#9ca3af' }
};

export const getTodayFocus = (): { day: string; focus: DayFocus } => {
    const currentDayIndex = new Date().getDay();
    const currentDay = DAYS[currentDayIndex];
    return {
        day: currentDay,
        focus: SCHEDULE[currentDay]
    };
};

export const getTodayDate = (): string => {
    return new Date().toISOString().split('T')[0];
};
