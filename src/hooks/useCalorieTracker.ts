import { useState, useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import type { FoodEntry, MealType, ReflectionType, UserCalorieSettings, DailyReflection as DailyReflectionType } from '../types/calories';

const DEFAULT_GOAL = 2200;
const STORAGE_KEY = 'focus_flow_calories_v1';

interface StoredData {
    entries: FoodEntry[];
    settings: UserCalorieSettings;
    reflections: DailyReflectionType[];
}

export const useCalorieTracker = () => {
    const { user } = useAuth();
    const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [entries, setEntries] = useState<FoodEntry[]>([]);
    const [settings, setSettings] = useState<UserCalorieSettings>({ dailyGoal: DEFAULT_GOAL });
    const [reflections, setReflections] = useState<DailyReflectionType[]>([]);
    const [loading, setLoading] = useState(true);

    // Goal Modal state
    const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
    const [tempGoal, setTempGoal] = useState('');

    // Load data from local storage
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const data: StoredData = JSON.parse(stored);
                setEntries(data.entries || []);
                setSettings(data.settings || { dailyGoal: DEFAULT_GOAL });
                setReflections(data.reflections || []);
            } catch (e: unknown) {
                console.error("Failed to parse calorie data", e);
            }
        }
        setLoading(false);
    }, []);

    // Save data to local storage on change
    useEffect(() => {
        if (!loading) {
            const data: StoredData = { entries, settings, reflections };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        }
    }, [entries, settings, reflections, loading]);

    const dailyEntries = useMemo(() => {
        return entries.filter(e => e.date === date);
    }, [entries, date]);

    const consumed = useMemo(() => {
        return dailyEntries.reduce((acc, curr) => acc + curr.calories, 0);
    }, [dailyEntries]);

    const currentReflection = useMemo(() => {
        return reflections.find(r => r.date === date)?.rating;
    }, [reflections, date]);

    // Calculate Streak
    const streak = useMemo(() => {
        const entryDates = new Set(entries.map(e => e.date));
        const today = new Date().toISOString().split('T')[0];

        // Check current streak (consecutive days ending today or yesterday)
        let currentStreak = 0;
        const d = new Date(today);

        // If today not logged, start checking from yesterday
        if (!entryDates.has(today)) {
            d.setDate(d.getDate() - 1);
        }

        while (true) {
            const iso = d.toISOString().split('T')[0];
            if (entryDates.has(iso)) {
                currentStreak++;
                d.setDate(d.getDate() - 1);
            } else {
                break;
            }
        }
        return currentStreak;
    }, [entries]);

    const handleAddEntry = (entryData: { name: string; calories: number; mealType: MealType; quantity: string; protein?: number; carbs?: number; fat?: number }) => {
        const newEntry: FoodEntry = {
            id: crypto.randomUUID(),
            userId: user?.id || 'guest',
            date: date,
            name: entryData.name,
            calories: entryData.calories,
            mealType: entryData.mealType,
            quantity: entryData.quantity,
            protein: entryData.protein,
            carbs: entryData.carbs,
            fat: entryData.fat,
            createdAt: Date.now()
        };
        setEntries(prev => [...prev, newEntry]);

        toast.success(`${entryData.name} added to ${entryData.mealType}`, {
            style: {
                background: '#0f172a',
                color: '#fff',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                borderRadius: '12px',
                fontSize: '0.9rem'
            },
            iconTheme: {
                primary: '#3b82f6',
                secondary: '#fff',
            },
        });
    };

    const handleDeleteEntry = (id: string) => {
        setEntries(prev => prev.filter(e => e.id !== id));
        toast.success('Food entry removed', {
            style: {
                background: '#1a0a0a',
                color: '#fff',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: '12px',
                fontSize: '0.9rem'
            },
            iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
            },
        });
    };

    const handleUpdateGoal = () => {
        setTempGoal(settings.dailyGoal.toString());
        setIsGoalModalOpen(true);
    };

    const confirmUpdateGoal = (e: React.FormEvent) => {
        e.preventDefault();
        const num = Number(tempGoal);
        if (!isNaN(num) && num > 0) {
            setSettings(prev => ({ ...prev, dailyGoal: num }));
            setIsGoalModalOpen(false);
            toast.success(`Daily goal updated to ${num} kcal`, {
                style: {
                    background: '#1a1a1a',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    fontSize: '0.9rem'
                },
                iconTheme: {
                    primary: '#3b82f6',
                    secondary: '#fff',
                },
            });
        }
    };

    const handleReflection = (rating: ReflectionType) => {
        setReflections(prev => {
            const others = prev.filter(r => r.date !== date);
            return [...others, { date, rating }];
        });
    };

    const handlePrevDay = () => {
        const d = new Date(date);
        d.setDate(d.getDate() - 1);
        setDate(d.toISOString().split('T')[0]);
    };

    const handleNextDay = () => {
        const d = new Date(date);
        const today = new Date().toISOString().split('T')[0];
        if (date < today) {
            d.setDate(d.getDate() + 1);
            setDate(d.toISOString().split('T')[0]);
        }
    };

    return {
        date,
        entries,
        settings,
        loading,
        dailyEntries,
        consumed,
        currentReflection,
        streak,
        isGoalModalOpen,
        tempGoal,
        setTempGoal,
        setIsGoalModalOpen,
        handleAddEntry,
        handleDeleteEntry,
        handleUpdateGoal,
        confirmUpdateGoal,
        handleReflection,
        handlePrevDay,
        handleNextDay
    };
};
