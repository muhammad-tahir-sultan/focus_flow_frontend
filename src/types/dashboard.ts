export interface DashboardStats {
    streak: number;
    activeGoals: number;
    droppedGoals: number;
    logsThisWeek: number;
    avgFocus?: number;
    totalTime: number;
    consistencyScore: number;
    dominantMood: string;
}

export interface AnalyticsData {
    date: string;
    value: number;
}

export interface NonNegotiablesData {
    completedCount: number;
    totalCount: number;
}

export interface ConsistencyData {
    week: number;
    value: number;
}

export type TimelineRange = 'Week' | 'Month' | '3M' | '6M' | 'Year' | 'Custom';

export interface Log {
    date: string;
    timeSpent: number;
    mood?: string;
}

export interface Goal {
    status: string;
}

export interface CustomRange {
    start: string;
    end: string;
}
