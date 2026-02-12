import api from './axios';

export const challengeApi = {
    getProgress: async () => {
        const response = await api.get('/challenge');
        return response.data;
    },

    toggleTask: async (task: string, completed: boolean, value?: string, note?: string, signal?: AbortSignal) => {
        const response = await api.post('/challenge/task', { task, completed, value, note }, { signal });
        return response.data;
    }
};
