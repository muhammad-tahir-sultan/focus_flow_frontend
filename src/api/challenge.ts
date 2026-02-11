import api from './axios';

export const challengeApi = {
    getProgress: async () => {
        const response = await api.get('/challenge');
        return response.data;
    },

    toggleTask: async (task: string, completed: boolean) => {
        const response = await api.post('/challenge/task', { task, completed });
        return response.data;
    }
};
