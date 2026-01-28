export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface FoodEntry {
    id: string;
    userId: string;
    date: string; // ISO date string YYYY-MM-DD
    name: string;
    calories: number;
    mealType: MealType;
    quantity?: string;
    protein?: number;
    carbs?: number;
    fat?: number;
    createdAt: number;
}

export interface UserCalorieSettings {
    dailyGoal: number;
}

export type ReflectionType = 'Good' | 'Okay' | 'Needs Improvement';

export interface DailyReflection {
    date: string;
    rating: ReflectionType;
}
