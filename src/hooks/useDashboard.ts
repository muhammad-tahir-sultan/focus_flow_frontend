
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../constants/api';
import type { DashboardStats, TimelineRange, Log, Goal, CustomRange, AnalyticsData, NonNegotiablesData, ConsistencyData } from '../types/dashboard';
import { useAuth } from '../context/AuthContext';

export const useDashboard = () => {
    const { isAdmin } = useAuth();
    const [stats, setStats] = useState<DashboardStats>({
        streak: 0,
        activeGoals: 0,
        droppedGoals: 0,
        logsThisWeek: 0,
        totalTime: 0,
        consistencyScore: 0,
        dominantMood: 'N/A'
    });
    const [loading, setLoading] = useState(true);
    const [showGraphs, setShowGraphs] = useState(true);
    const [timeline, setTimeline] = useState<TimelineRange>('Month');
    const [allLogs, setAllLogs] = useState<Log[]>([]);
    const [allGoals, setAllGoals] = useState<Goal[]>([]);
    const [backendBaseStats, setBackendBaseStats] = useState<any>(null);
    const [showCustomPicker, setShowCustomPicker] = useState(false);
    const [customRange, setCustomRange] = useState<CustomRange>({ start: '', end: '' });

    // System Time
    const [currentTime, setCurrentTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Analytics data
    const [streakData, setStreakData] = useState<AnalyticsData[]>([]);
    const [timeData, setTimeData] = useState<AnalyticsData[]>([]);
    const [nonNegotiablesData, setNonNegotiablesData] = useState<NonNegotiablesData>({ completedCount: 0, totalCount: 0 });
    const [consistencyData, setConsistencyData] = useState<ConsistencyData[]>([]);
    const [analyticsLoading, setAnalyticsLoading] = useState(true);
    const [analyticsError, setAnalyticsError] = useState('');

    useEffect(() => {
        const fetchBaseData = async () => {
            try {
                const [logsRes, goalsRes, backendStatsRes] = await Promise.all([
                    axios.get<Log[]>(`${BACKEND_URL}/daily-logs`),
                    axios.get<Goal[]>(`${BACKEND_URL}/goals`),
                    axios.get<any>(`${BACKEND_URL}/daily-logs/stats`)
                ]);

                setAllLogs(logsRes.data);
                setAllGoals(goalsRes.data);
                setBackendBaseStats(backendStatsRes.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBaseData();
    }, []);

    useEffect(() => {
        if (!allLogs.length && !allGoals.length) return;

        const calculateTimelineStats = () => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            let startDate = new Date(today);
            let endDate = new Date(today);
            endDate.setHours(23, 59, 59, 999);

            if (timeline === 'Week') {
                startDate.setDate(today.getDate() - 7);
            } else if (timeline === 'Month') {
                startDate.setMonth(today.getMonth() - 1);
            } else if (timeline === '3M') {
                startDate.setMonth(today.getMonth() - 3);
            } else if (timeline === '6M') {
                startDate.setMonth(today.getMonth() - 6);
            } else if (timeline === 'Year') {
                startDate.setFullYear(today.getFullYear() - 1);
            } else if (timeline === 'Custom' && customRange.start && customRange.end) {
                startDate = new Date(customRange.start);
                endDate = new Date(customRange.end);
                endDate.setHours(23, 59, 59, 999);
            }

            const filteredLogs = allLogs.filter(l => {
                const d = new Date(l.date);
                return d >= startDate && d <= endDate;
            });

            // Active Goals (Context independent as they are current status)
            const activeGoals = allGoals.filter(g => g.status === 'Active').length;
            const droppedGoals = allGoals.filter(g => g.status === 'Dropped').length;

            const totalTime = filteredLogs.reduce((sum, l) => sum + (l.timeSpent || 0), 0);

            // Logs in this specific range for "Logs in Period"
            const logsInPeriod = filteredLogs.length;

            // Consistency Score for THIS period
            const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
            const consistencyScore = Math.min(Math.round((logsInPeriod / diffDays) * 100), 100);

            // Dominant Mood Calculation
            const moodCounts: Record<string, number> = {};
            filteredLogs.forEach(l => {
                if (l.mood) {
                    moodCounts[l.mood] = (moodCounts[l.mood] || 0) + 1;
                }
            });

            let dominantMood = 'N/A';
            let maxCount = 0;
            const moodIcons: Record<string, string> = {
                high: 'High',
                good: 'Good',
                neutral: 'Neutral',
                low: 'Low'
            };

            Object.entries(moodCounts).forEach(([mood, count]) => {
                if (count > maxCount) {
                    maxCount = count;
                    dominantMood = moodIcons[mood] || mood;
                }
            });

            setStats({
                streak: backendBaseStats?.streak || 0,
                activeGoals,
                droppedGoals,
                logsThisWeek: logsInPeriod,
                avgFocus: backendBaseStats?.avgFocus || 0,
                totalTime,
                consistencyScore,
                dominantMood
            });
        };

        calculateTimelineStats();
    }, [timeline, allLogs, allGoals, backendBaseStats, customRange]);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                setAnalyticsLoading(true);
                const [streakRes, timeRes, nonNegRes, consistencyRes] = await Promise.all([
                    axios.get(`${BACKEND_URL}/daily-logs/analytics/streak`),
                    axios.get(`${BACKEND_URL}/daily-logs/analytics/time-invested`),
                    axios.get(`${BACKEND_URL}/daily-logs/analytics/non-negotiables`),
                    axios.get(`${BACKEND_URL}/daily-logs/analytics/consistency`),
                ]);

                setStreakData(streakRes.data);
                setTimeData(timeRes.data);
                setNonNegotiablesData(nonNegRes.data);
                setConsistencyData(consistencyRes.data);
            } catch (err) {
                console.error(err);
                setAnalyticsError('Failed to load analytics data');
            } finally {
                setAnalyticsLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    return {
        stats,
        loading,
        showGraphs,
        setShowGraphs,
        timeline,
        setTimeline,
        currentTime,
        showCustomPicker,
        setShowCustomPicker,
        customRange,
        setCustomRange,
        streakData,
        timeData,
        nonNegotiablesData,
        consistencyData,
        analyticsLoading,
        analyticsError,
        isAdmin
    };
};
