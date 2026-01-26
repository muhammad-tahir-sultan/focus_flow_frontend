import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BACKEND_URL } from '../constants/api';
import type { DailyLogFormData } from '../types/dailyLog';
import { NON_NEGOTIABLES } from '../data/dailyLogData';

export const useDailyLog = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<DailyLogFormData>({
        description: '',
        timeSpent: '',
        reflection: '',
        date: new Date().toISOString().split('T')[0],
        mood: 'neutral',
    });

    const [availableItems, setAvailableItems] = useState<string[]>([]);
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

    // Initialize/Load checklist items from DB
    useEffect(() => {
        const fetchChecklist = async () => {
            try {
                // We use a slight delay or optimistic assumption that if it fails, we fall back to defaults locally?
                // But simplified:
                const res = await axios.get(`${BACKEND_URL}/users/checklist`);
                if (res.data) {
                    setAvailableItems(res.data);
                }
            } catch (err) {
                console.error('Failed to fetch checklist', err);
                // Fallback to defaults only if API fails hard and list is empty
                if (availableItems.length === 0) setAvailableItems(NON_NEGOTIABLES);
            }
        };
        fetchChecklist();
    }, []);

    const updateChecklist = async (newItems: string[]) => {
        setAvailableItems(newItems); // Optimistic update
        try {
            await axios.put(`${BACKEND_URL}/users/checklist`, { checklist: newItems });
        } catch (err) {
            console.error('Failed to save checklist', err);
            toast.error('Failed to save checklist changes');
        }
    };

    const addItem = (item: string) => {
        if (item && !availableItems.includes(item)) {
            const newItems = [...availableItems, item];
            updateChecklist(newItems);
        }
    };

    const deleteItem = (itemToDelete: string) => {
        const newItems = availableItems.filter(item => item !== itemToDelete);
        updateChecklist(newItems);

        // Also remove from checkedItems to keep state clean
        const newChecked = { ...checkedItems };
        delete newChecked[itemToDelete];
        setCheckedItems(newChecked);
    };

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (id) {
            const fetchLog = async () => {
                try {
                    setIsLoading(true);
                    const res = await axios.get(`${BACKEND_URL}/daily-logs/${id}`);
                    const log = res.data;

                    // Parse description for checked items based on CURRENT available items + potentially historical ones
                    const newCheckedItems: Record<string, boolean> = {};

                    // Basic parsing: check if lines exist in the log description
                    // We also need to be careful: if a log has a legacy item that is NO LONGER in availableItems, 
                    // should we show it? 
                    // The user prompt implies managing the checklist for *future* or *current* editing.
                    // For simply reading historical logs, we rely on the text description primarily.
                    // But if we are editing an old log, we map the checkboxes.

                    availableItems.forEach(item => {
                        if (log.description.includes(`[x] ${item}`)) {
                            newCheckedItems[item] = true;
                        }
                    });

                    // Also scan for any [x] Item that might not be in our list, to avoid losing data?
                    // For now, let's stick to the user's request: "add and delete according to need".
                    // The description contains the truth.

                    // Clean up description (remove the non-negotiables section for editing)
                    const descriptionParts = log.description.split('\n\n**Completed Non-Negotiables:**');

                    setFormData({
                        description: descriptionParts[0],
                        timeSpent: log.timeSpent.toString(),
                        reflection: log.reflection,
                        date: new Date(log.date).toISOString().split('T')[0],
                        mood: log.mood || 'neutral',
                    });
                    setCheckedItems(newCheckedItems);
                } catch (err) {
                    console.error('Failed to fetch log', err);
                    setError('Failed to load log data');
                    toast.error('Archive Retrieval Failed: Log not found.');
                } finally {
                    setIsLoading(false);
                }
            };
            fetchLog();
        }
    }, [id, availableItems]); // dependency on availableItems so we parse correctly after they load

    const handleCheckChange = (item: string) => {
        setCheckedItems(prev => ({
            ...prev,
            [item]: !prev[item]
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const completedItems = Object.entries(checkedItems)
                .filter(([_, isChecked]) => isChecked)
                .map(([item]) => `- [x] ${item}`)
                .join('\n');

            const finalDescription = `${formData.description}\n\n**Completed Non-Negotiables:**\n${completedItems}`;

            if (id) {
                await axios.patch(`${BACKEND_URL}/daily-logs/${id}`, {
                    ...formData,
                    description: finalDescription,
                    timeSpent: Number(formData.timeSpent),
                });
                toast.success('Log Synchronized: Execution record updated.', {
                    style: {
                        background: '#0f0f11',
                        color: '#fff',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                    },
                    icon: '🔄',
                });
            } else {
                await axios.post(`${BACKEND_URL}/daily-logs`, {
                    ...formData,
                    description: finalDescription,
                    timeSpent: Number(formData.timeSpent),
                });
                toast.success('Execution Recorded: Your progress is archived.', {
                    style: {
                        background: '#0f0f11',
                        color: '#fff',
                        border: '1px solid rgba(34, 197, 94, 0.2)',
                    },
                    icon: '📝',
                });
            }
            navigate('/history');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to submit log');
            toast.error('Submission Failed: Protocol interrupted.');
        }
    };

    return {
        formData,
        setFormData,
        checkedItems,
        handleCheckChange,
        availableItems,
        addItem,
        deleteItem,
        error,
        isLoading,
        handleSubmit,
        isEditing: !!id
    };
};
