export interface DailyChecklist {
    workout: boolean;
    run: boolean;
    water: boolean;
    sleep: boolean;
    stretch: boolean;
}

export interface FitnessStats {
    totalLogs: number;
    workouts: number;
    runs: number;
    water: number;
    sleep: number;
    logs: FitnessLogData[];
}

export interface FitnessLogData {
    date: string;
    workoutCompleted: boolean;
    runCompleted: boolean;
    waterIntake: boolean;
    sleepQuality: boolean;
    stretchDone: boolean;
}

export interface ChartDataPoint {
    date: string;
    Workout: number;
    Run: number;
    Water: number;
    Sleep: number;
}

export interface PieDataPoint {
    name: string;
    value: number;
    color: string;
    [key: string]: string | number; // Index signature for Recharts compatibility
}

export type FocusType = 'Push' | 'Pull' | 'Legs' | 'Rest';

export interface DayFocus {
    type: FocusType;
    icon: string;
    muscles: string;
    color: string;
}
