export interface Log {
    _id: string;
    date: string;
    timeSpent: number;
    description: string;
    reflection: string;
    mood?: 'high' | 'neutral' | 'good' | 'low';
    isFavorite?: boolean;
}

export interface LogStats {
    totalLogs: number;
    streak: number;
    avgFocus: number;
    improvement: number;
    totalTime: number;
}

export type PeriodFilter = 'this-month' | 'last-month' | 'last-3-months';
export type MoodFilter = 'all' | 'high' | 'neutral' | 'good' | 'low';
