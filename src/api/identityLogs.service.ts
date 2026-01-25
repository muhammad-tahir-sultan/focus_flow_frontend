
import api from './axios';

export const logDay = async (data: { date: string, month: number, completedItems: string[], completionPercentage: number }) => {
    const response = await api.post('/identity-logs', data);
    return response.data;
};

export const getLog = async (date: string) => {
    const response = await api.get(`/identity-logs/${date}`);
    return response.data;
};

export const getStats = async () => {
    const response = await api.get('/identity-logs/stats');
    return response.data;
};
