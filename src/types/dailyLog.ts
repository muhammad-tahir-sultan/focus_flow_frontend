export interface DailyLogFormData {
    description: string;
    timeSpent: string;
    reflection: string;
    date: string;
    mood: 'high' | 'neutral' | 'good' | 'low';
}

export interface LogEntry {
    _id: string;
    description: string;
    timeSpent: number;
    reflection: string;
    date: string;
    mood: 'high' | 'neutral' | 'good' | 'low';
}
