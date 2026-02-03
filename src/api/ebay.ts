import axiosClient from './axios';

export interface EbayTaskLog {
    _id: string;
    date: string;
    focusAreas: string[];
    tasksCompleted: string[];
    timeSpentMinutes: number;
    winOfTheDay: string;
    blockerOrLesson: string;
    outreachCount?: number;
    createdAt: string;
}

export interface CreateEbayLogDto {
    date: string;
    focusAreas: string[];
    tasksCompleted: string[];
    timeSpentMinutes: number;
    winOfTheDay: string;
    blockerOrLesson: string;
    outreachCount?: number;
}

export interface EbayStats {
    totalTime: number;
    logsCount: number;
}

export const ebayApi = {
    getAll: async () => {
        const response = await axiosClient.get<EbayTaskLog[]>('/ebay-business');
        return response.data;
    },
    create: async (data: CreateEbayLogDto) => {
        const response = await axiosClient.post<EbayTaskLog>('/ebay-business', data);
        return response.data;
    },
    getStats: async () => {
        const response = await axiosClient.get<EbayStats>('/ebay-business/stats');
        return response.data;
    },
    delete: async (id: string) => {
        await axiosClient.delete(`/ebay-business/${id}`);
    }
};
