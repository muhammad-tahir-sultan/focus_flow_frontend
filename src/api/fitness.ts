import api from './axios';

export interface FitnessLog {
    _id?: string;
    userId?: string;
    date: string;
    workoutCompleted: boolean;
    runCompleted: boolean;
    waterIntake: boolean;
    sleepQuality: boolean; // boolean as per checklist, but backend supports it
    stretchDone: boolean;
}

export const getTodayFitnessLog = async (date: string) => {
    const response = await api.get(`/fitness/today?date=${date}`);
    return response.data;
};

export const logFitnessDaily = async (data: Partial<FitnessLog>) => {
    const response = await api.post('/fitness/log', data);
    return response.data;
};

export const getFitnessStats = async () => {
    const response = await api.get('/fitness/stats');
    return response.data;
};
