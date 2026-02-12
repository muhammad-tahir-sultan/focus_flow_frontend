import { useState, useEffect, useCallback, useRef } from 'react';
import { challengeApi } from '../../../../api/challenge';
import toast from 'react-hot-toast';
import type { ChallengeData, TaskLog } from './types';

export const useChallengeData = () => {
    const [data, setData] = useState<ChallengeData | null>(null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState<{ [key: string]: { value: string, note: string } }>({});

    // Track inflight requests for each task to "drop" them if a new one starts
    const abortControllers = useRef<{ [key: string]: AbortController }>({});

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

        // Cancel previous request for this specific task if it's still running
        if (abortControllers.current[taskCode]) {
            abortControllers.current[taskCode].abort();
        }

        const controller = new AbortController();
        abortControllers.current[taskCode] = controller;

        const currentLog = data.today.taskLogs.find(l => l.taskCode === taskCode);
        const newCompleted = !currentLog?.completed;
        const currentEdit = editMode[taskCode] || { value: '', note: '' };

        // 1. Update LOCAL state immediately (non-optimistic, the base state)
        setData(prev => {
            if (!prev || !prev.today) return prev;
            const updatedToday = {
                ...prev.today,
                taskLogs: prev.today.taskLogs.map(l =>
                    l.taskCode === taskCode ? { ...l, completed: newCompleted } : l
                )
            };
            const newHistory = prev.progress?.history.map(h =>
                new Date(h.date).toDateString() === new Date(updatedToday.date).toDateString() ? updatedToday : h
            ) || [];

            return { ...prev, today: updatedToday, progress: prev.progress ? { ...prev.progress, history: newHistory } : null };
        });

        try {
            // 2. Perform API call with cancellation support
            const result = await challengeApi.toggleTask(
                taskCode,
                newCompleted,
                currentEdit.value,
                currentEdit.note,
                controller.signal
            );

            // 3. Final sync with server result
            setData(prev => {
                if (!prev) return null;
                const newHistory = prev.progress?.history.map(h =>
                    new Date(h.date).toDateString() === new Date(result.date).toDateString() ? result : h
                ) || [];
                return { ...prev, today: result, progress: prev.progress ? { ...prev.progress, history: newHistory } : null };
            });
        } catch (error: any) {
            if (error.name === 'CanceledError' || error.name === 'AbortError') {
                // Request was cancelled by a newer click, ignore
                return;
            }
            console.error(error);
            toast.error("Failed to update task");
            // Revert on error? For now, just log.
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
                return { ...prev, today: result, progress: prev.progress ? { ...prev.progress, history: newHistory } : null };
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
        return () => {
            // Cleanup: abort all on unmount
            Object.values(abortControllers.current).forEach(c => c.abort());
        };
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
