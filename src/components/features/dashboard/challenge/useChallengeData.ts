import { useState, useEffect, useCallback } from 'react';
import { challengeApi } from '../../../../api/challenge';
import toast from 'react-hot-toast';
import type { ChallengeData, TaskLog } from './types';

export const useChallengeData = () => {
    const [data, setData] = useState<ChallengeData | null>(null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState<{ [key: string]: { value: string, note: string } }>({});

    const fetchData = useCallback(async () => {
        try {
            const result = await challengeApi.getProgress();
            setData(result);

            const initialEditMode: { [key: string]: { value: string, note: string } } = {};
            result.today?.taskLogs.forEach((log: TaskLog) => {
                initialEditMode[log.taskCode] = { value: log.value, note: log.note };
            });
            setEditMode(initialEditMode);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load challenge data");
        } finally {
            setLoading(false);
        }
    }, []);

    const handleToggle = useCallback(async (taskCode: string) => {
        if (!data || !data.today) return;

        const currentLog = data.today.taskLogs.find(l => l.taskCode === taskCode);
        const newCompleted = !currentLog?.completed;
        const currentEdit = editMode[taskCode] || { value: '', note: '' };

        try {
            const result = await challengeApi.toggleTask(taskCode, newCompleted, currentEdit.value, currentEdit.note);
            setData(prev => {
                if (!prev) return null;
                // Update history as well so stats update in real-time
                const newHistory = prev.progress?.history.map(h =>
                    new Date(h.date).toDateString() === new Date(result.date).toDateString() ? result : h
                ) || [];

                // If today isn't in history yet (first task of the day), add it
                const todayExists = newHistory.some(h => new Date(h.date).toDateString() === new Date(result.date).toDateString());
                if (!todayExists) newHistory.push(result);

                return {
                    ...prev,
                    today: result,
                    progress: prev.progress ? { ...prev.progress, history: newHistory } : null
                };
            });
            toast.success(newCompleted ? "Task marked complete!" : "Task reset.");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update task");
        }
    }, [data, editMode]);

    const handleSaveDetails = useCallback(async (taskCode: string, onComplete?: () => void) => {
        if (!data || !data.today) return;

        const currentLog = data.today.taskLogs.find(l => l.taskCode === taskCode);
        const currentEdit = editMode[taskCode] || { value: '', note: '' };

        try {
            const result = await challengeApi.toggleTask(taskCode, currentLog?.completed || false, currentEdit.value, currentEdit.note);
            setData(prev => {
                if (!prev) return null;
                const newHistory = prev.progress?.history.map(h =>
                    new Date(h.date).toDateString() === new Date(result.date).toDateString() ? result : h
                ) || [];

                return {
                    ...prev,
                    today: result,
                    progress: prev.progress ? { ...prev.progress, history: newHistory } : null
                };
            });
            toast.success("Progress saved!");
            if (onComplete) onComplete();
        } catch (error) {
            console.error(error);
            toast.error("Failed to save progress");
        }
    }, [data, editMode]);

    const updateEditMode = useCallback((taskCode: string, field: 'value' | 'note', val: string) => {
        setEditMode(prev => ({
            ...prev,
            [taskCode]: { ...(prev[taskCode] || { value: '', note: '' }), [field]: val }
        }));
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        data,
        loading,
        editMode,
        handleToggle,
        handleSaveDetails,
        updateEditMode,
        refresh: fetchData
    };
};
