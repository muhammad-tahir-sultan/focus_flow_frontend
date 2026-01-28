import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import api from '../api/axios';
import type { SkillEntry, SkillFormData } from '../types/skill';

export const useSkills = () => {
    const [entries, setEntries] = useState<SkillEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Filter State
    const [dateFilter, setDateFilter] = useState('weekly');
    const [customStartDate, setCustomStartDate] = useState('');
    const [customEndDate, setCustomEndDate] = useState('');

    const getStartDateForFilter = (filter: string) => {
        const now = new Date();
        const d = new Date(now);
        switch (filter) {
            case 'weekly': d.setDate(now.getDate() - 7); break;
            case '2weeks': d.setDate(now.getDate() - 14); break;
            case '1month': d.setMonth(now.getMonth() - 1); break;
            case '3months': d.setMonth(now.getMonth() - 3); break;
            case '6months': d.setMonth(now.getMonth() - 6); break;
            case '1year': d.setFullYear(now.getFullYear() - 1); break;
            case 'all': return null;
            default: return null;
        }
        return d.toISOString().split('T')[0];
    };

    const fetchSkills = useCallback(async () => {
        setLoading(true);
        try {
            const params: any = {};
            if (dateFilter === 'custom' && customStartDate && customEndDate) {
                params.startDate = customStartDate;
                params.endDate = customEndDate;
            } else if (dateFilter !== 'all' && dateFilter !== 'custom') {
                const startDate = getStartDateForFilter(dateFilter);
                if (startDate) params.startDate = startDate;
            }

            const { data } = await api.get('/skills', { params });
            setEntries(data);
        } catch (error) {
            console.error('Failed to fetch skills', error);
            toast.error('Failed to load history');
        } finally {
            setLoading(false);
        }
    }, [dateFilter, customStartDate, customEndDate]);

    useEffect(() => {
        fetchSkills();
    }, [fetchSkills]);

    const createSkill = async (formData: SkillFormData) => {
        setSubmitting(true);
        try {
            const { data } = await api.post('/skills', formData);
            setEntries(prev => [data, ...prev]);
            toast.success('Skill log added successfully!');
            return true;
        } catch (error) {
            console.error('Error adding skill:', error);
            toast.error('Failed to save skill log');
            return false;
        } finally {
            setSubmitting(false);
        }
    };

    return {
        entries,
        loading,
        submitting,
        dateFilter,
        setDateFilter,
        customStartDate,
        setCustomStartDate,
        customEndDate,
        setCustomEndDate,
        createSkill,
        refreshSkills: fetchSkills
    };
};
