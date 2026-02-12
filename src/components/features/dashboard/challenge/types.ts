export interface TaskLog {
    taskCode: string;
    value: string;
    note: string;
    completed: boolean;
}

export interface TaskDefinition {
    code: string;
    label: string;
}

export interface ChallengeData {
    today: {
        userId: string;
        date: string;
        taskLogs: TaskLog[];
        isFullyCompleted: boolean;
    } | null;
    progress: {
        history: any[];
        totalDays: number;
        activeDays: number;
        perfectDays: number;
        consistencyPercentage: number;
        completionPercentage: number;
    } | null;
}

export const TASKS: TaskDefinition[] = [
    { code: "pushups", label: "100 Push ups" },
    { code: "pullups", label: "10 Pull Ups" },
    { code: "situps", label: "100 Sit Ups" },
    { code: "squats", label: "150 Squats" },
    { code: "plank", label: "1 Minute Plank Hold - 3x Set" },
    { code: "bike", label: "Bike" },
    { code: "income", label: "Second Source of Income" },
    { code: "appointment", label: "No Appointment" },
];
