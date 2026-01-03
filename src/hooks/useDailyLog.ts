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

    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (id) {
            const fetchLog = async () => {
                try {
                    setIsLoading(true);
                    const res = await axios.get(`${BACKEND_URL}/daily-logs/${id}`);
                    const log = res.data;

                    // Parse description for checked items
                    const newCheckedItems: Record<string, boolean> = {};
                    NON_NEGOTIABLES.forEach(item => {
                        if (log.description.includes(`[x] ${item}`)) {
                            newCheckedItems[item] = true;
                        }
                    });

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
    }, [id]);

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
        error,
        isLoading,
        handleSubmit,
        isEditing: !!id
    };
};
