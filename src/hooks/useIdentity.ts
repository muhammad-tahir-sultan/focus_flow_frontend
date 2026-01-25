import { useState, useEffect, useCallback } from 'react';
import { getStats, getLog, logDay } from '../api/identityLogs.service';
import { twelveMonthPlan } from '../data/identityData';
import toast from 'react-hot-toast';

// Helper to get today's date string YYYY-MM-DD
const getTodayDate = () => new Date().toISOString().split('T')[0];

export const useIdentity = () => {
    const [currentDate, setCurrentDate] = useState(getTodayDate());
    const [activeMonth, setActiveMonth] = useState(1);
    const [todayChecklist, setTodayChecklist] = useState<string[]>([]);
    const [analyticsData, setAnalyticsData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [completedLevels, setCompletedLevels] = useState<number[]>([]);

    // Initial Load
    useEffect(() => {
        fetchStats();
        const savedLevels = localStorage.getItem('focus_flow_completed_levels');
        if (savedLevels) {
            setCompletedLevels(JSON.parse(savedLevels));
        }
    }, []);

    // Date Change Load
    useEffect(() => {
        fetchLogForDate(currentDate);
    }, [currentDate]);

    const fetchLogForDate = useCallback(async (date: string) => {
        setLoading(true);
        try {
            const log = await getLog(date);
            setTodayChecklist(log.completedItems || []);
            if (log.month) setActiveMonth(log.month);
        } catch (error) {
            console.error('Failed to fetch log', error);
            setTodayChecklist([]);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchStats = useCallback(async () => {
        try {
            const stats = await getStats();
            // Transform stats for chart
            const data = stats.map((s: any) => ({
                date: s.date.substring(5), // MM-DD
                completed: s.completedItems?.length || 0,
                full: s.completionPercentage
            }));
            setAnalyticsData(data);
        } catch (error) {
            console.error('Failed to fetch stats', error);
        }
    }, []);

    const changeDate = (days: number) => {
        const date = new Date(currentDate);
        date.setDate(date.getDate() + days);
        setCurrentDate(date.toISOString().split('T')[0]);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentDate(e.target.value);
    };

    const toggleDailyItem = async (item: string) => {
        const newChecklist = todayChecklist.includes(item)
            ? todayChecklist.filter(i => i !== item)
            : [...todayChecklist, item];

        setTodayChecklist(newChecklist);

        // Optimistic UI update, then save
        const maxItems = twelveMonthPlan[activeMonth - 1].dailyNonNegotiables.length;
        const percentage = (newChecklist.length / maxItems) * 100;

        try {
            await logDay({
                date: currentDate,
                month: activeMonth,
                completedItems: newChecklist,
                completionPercentage: percentage
            });
            // Refresh stats silently to keep graph up to date
            fetchStats();
        } catch (error) {
            console.error('Failed to save log', error);
            toast.error('Failed to save progress');
        }
    };

    const toggleLevel = (index: number) => {
        const newCompleted = completedLevels.includes(index)
            ? completedLevels.filter(i => i !== index)
            : [...completedLevels, index];

        setCompletedLevels(newCompleted);
        localStorage.setItem('focus_flow_completed_levels', JSON.stringify(newCompleted));
        if (!completedLevels.includes(index)) {
            toast.success('Level Achieved!', { icon: '🎉' });
        }
    };

    return {
        currentDate,
        activeMonth,
        setActiveMonth,
        todayChecklist,
        analyticsData,
        loading,
        completedLevels,
        changeDate,
        handleDateChange,
        toggleDailyItem,
        toggleLevel,
        getTodayDate
    };
};
