import { useState, useEffect } from 'react';
import { challengeApi } from '../../../../api/challenge';
import toast from 'react-hot-toast';
import type { ChallengeData, TaskLog } from './types';

export const useChallengeData = () => {
    const [data, setData] = useState<ChallengeData | null>(null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState<{ [key: string]: { value: string, note: string } }>({});

    const fetchData = async () => {
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
    };

    const handleToggle = async (taskCode: string) => {
        if (!data || !data.today) return;

        const currentLog = data.today.taskLogs.find(l => l.taskCode === taskCode);
        const newCompleted = !currentLog?.completed;
        const currentEdit = editMode[taskCode] || { value: '', note: '' };

        try {
            const result = await challengeApi.toggleTask(taskCode, newCompleted, currentEdit.value, currentEdit.note);
            setData({ ...data, today: result });
            toast.success(newCompleted ? "Task marked complete!" : "Task reset.");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update task");
        }
    };

    const handleSaveDetails = async (taskCode: string, onComplete?: () => void) => {
        if (!data || !data.today) return;

        const currentLog = data.today.taskLogs.find(l => l.taskCode === taskCode);
        const currentEdit = editMode[taskCode] || { value: '', note: '' };

        try {
            const result = await challengeApi.toggleTask(taskCode, currentLog?.completed || false, currentEdit.value, currentEdit.note);
            setData({ ...data, today: result });
            toast.success("Progress saved!");
            if (onComplete) onComplete();
        } catch (error) {
            console.error(error);
            toast.error("Failed to save progress");
        }
    };

    const updateEditMode = (taskCode: string, field: 'value' | 'note', val: string) => {
        setEditMode(prev => ({
            ...prev,
            [taskCode]: { ...(prev[taskCode] || { value: '', note: '' }), [field]: val }
        }));
    };

    useEffect(() => {
        fetchData();
    }, []);

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
