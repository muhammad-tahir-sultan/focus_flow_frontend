
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BACKEND_URL } from '../constants/api';
import type { Log, LogStats, PeriodFilter, MoodFilter } from '../types/history';

export const useHistory = () => {
    const [logs, setLogs] = useState<Log[]>([]);
    const [stats, setStats] = useState<LogStats>({ totalLogs: 0, streak: 0, avgFocus: 0, improvement: 0, totalTime: 0 });
    const [initialLoading, setInitialLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [periodFilter, setPeriodFilter] = useState<PeriodFilter>('this-month');
    const [moodFilter, setMoodFilter] = useState<MoodFilter>('all');

    const fetchLogs = async () => {
        try {
            if (logs.length === 0) setInitialLoading(true);
            else setIsRefreshing(true);
            const params: any = {};
            if (moodFilter !== 'all') params.mood = moodFilter;

            // Handle period/time filters
            const now = new Date();
            if (periodFilter === 'this-month') {
                params.startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
            } else if (periodFilter === 'last-month') {
                params.startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString();
                params.endDate = new Date(now.getFullYear(), now.getMonth(), 0).toISOString();
            } else if (periodFilter === 'last-3-months') {
                params.startDate = new Date(now.getFullYear(), now.getMonth() - 2, 1).toISOString();
            }

            const [logsRes, statsRes] = await Promise.all([
                axios.get<Log[]>(`${BACKEND_URL}/daily-logs`, { params }),
                axios.get<LogStats>(`${BACKEND_URL}/daily-logs/stats`)
            ]);

            setLogs(logsRes.data);
            setStats(statsRes.data);
            if (isRefreshing) {
                toast.success('Reflection Timeline Updated', {
                    id: 'history-refresh',
                    duration: 2000,
                    style: { background: '#0f0f11', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.1)' }
                });
            }
        } catch (err) {
            console.error(err);
            toast.error('Failed to reconstruct history. Terminal error.');
        } finally {
            setInitialLoading(false);
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, [moodFilter, periodFilter]);

    const handleToggleFavorite = async (log: Log) => {
        try {
            await axios.patch(`${BACKEND_URL}/daily-logs/${log._id}`, {
                isFavorite: !log.isFavorite
            });
            setLogs(logs.map(l => l._id === log._id ? { ...l, isFavorite: !l.isFavorite } : l));

            if (!log.isFavorite) {
                toast.success('Added to Favorites.', {
                    style: {
                        background: '#0f0f11',
                        color: '#fff',
                        border: '1px solid rgba(234, 179, 8, 0.2)',
                    },
                    icon: '⭐',
                });
            }
        } catch (err) {
            console.error('Failed to toggle favorite', err);
            toast.error('Failed to update favorite status.');
        }
    };

    const getMoodDetails = (log: Log): { label: string; color: string; icon: string } => {
        if (log.mood) {
            const moods: Record<string, any> = {
                high: { label: 'HIGH FOCUS', color: '#3b82f6', icon: '⚡' },
                neutral: { label: 'NEUTRAL', color: '#eab308', icon: '💡' },
                good: { label: 'GOOD', color: '#22c55e', icon: '✓' },
                low: { label: 'LOW', color: '#ef4444', icon: '📉' }
            };
            return moods[log.mood] || moods.neutral;
        }

        if (log.timeSpent >= 6) return { label: 'HIGH FOCUS', color: '#3b82f6', icon: '⚡' };
        if (log.timeSpent >= 3) return { label: 'NEUTRAL', color: '#eab308', icon: '💡' };
        return { label: 'GOOD', color: '#22c55e', icon: '✓' };
    };

    return {
        logs,
        stats,
        initialLoading,
        isRefreshing,
        periodFilter,
        setPeriodFilter,
        moodFilter,
        setMoodFilter,
        fetchLogs,
        handleToggleFavorite,
        getMoodDetails
    };
};
