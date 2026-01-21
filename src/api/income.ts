import api from './axios';
import type { Income, IncomeFormData } from '../types/finance';

export const createIncome = async (incomeData: IncomeFormData): Promise<Income> => {
    const response = await api.post('/income', {
        ...incomeData,
        amount: parseFloat(incomeData.amount),
    });
    return response.data;
};

export const getAllIncome = async (): Promise<Income[]> => {
    const response = await api.get('/income');
    return response.data;
};

export const getIncomeById = async (id: string): Promise<Income> => {
    const response = await api.get(`/income/${id}`);
    return response.data;
};

export const updateIncome = async (id: string, incomeData: Partial<IncomeFormData>): Promise<Income> => {
    const payload: any = { ...incomeData };
    if (incomeData.amount) {
        payload.amount = parseFloat(incomeData.amount);
    }
    const response = await api.patch(`/income/${id}`, payload);
    return response.data;
};

export const deleteIncome = async (id: string): Promise<void> => {
    await api.delete(`/income/${id}`);
};

export const getTotalIncome = async (startDate?: string, endDate?: string): Promise<number> => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);

    const response = await api.get(`/income/stats/total?${params.toString()}`);
    return response.data;
};
