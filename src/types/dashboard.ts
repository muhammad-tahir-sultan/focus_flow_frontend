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

export interface NonNegotiableData {
    name: string;
    value: number;
    total: number;
}
