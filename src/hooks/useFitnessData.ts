import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { getTodayFitnessLog, logFitnessDaily, getFitnessStats, FitnessLog } from '../api/fitness';
import { DailyChecklist, FitnessStats } from '../types/fitness.types';
import { getTodayDate } from '../utils/fitnessUtils';

export const useFitnessData = () => {
    const [dailyChecklist, setDailyChecklist] = useState<DailyChecklist>({
        workout: false,
        run: false,
        water: false,
        sleep: false,
        stretch: false
    });
    const [stats, setStats] = useState<FitnessStats | null>(null);
    const [loading, setLoading] = useState(true);

    const todayDate = getTodayDate();

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = async () => {
        try {
            const [todayLog, statsData] = await Promise.all([
                getTodayFitnessLog(todayDate),
                getFitnessStats()
            ]);

            if (todayLog) {
                setDailyChecklist({
                    workout: todayLog.workoutCompleted,
                    run: todayLog.runCompleted,
                    water: todayLog.waterIntake,
                    sleep: todayLog.sleepQuality,
                    stretch: todayLog.stretchDone
                });
            }
            setStats(statsData);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load fitness data");
        } finally {
            setLoading(false);
        }
    };

    const toggleCheck = async (key: keyof DailyChecklist) => {
        const newState = !dailyChecklist[key];
        setDailyChecklist(prev => ({ ...prev, [key]: newState }));

        const apiFieldMap: Record<string, keyof FitnessLog> = {
            workout: 'workoutCompleted',
            run: 'runCompleted',
            water: 'waterIntake',
            sleep: 'sleepQuality',
            stretch: 'stretchDone'
        };

        const fieldName = apiFieldMap[key];
        if (!fieldName) return;

        try {
            await logFitnessDaily({
                date: todayDate,
                [fieldName]: newState
            });
            // Update stats immediately to reflect changes in charts
            const newStats = await getFitnessStats();
            setStats(newStats);
        } catch (error) {
            console.error(error);
            toast.error("Failed to save progress");
            setDailyChecklist(prev => ({ ...prev, [key]: !newState })); // Revert on failure
        }
    };

    return {
        dailyChecklist,
        stats,
        loading,
        todayDate,
        toggleCheck
    };
};
