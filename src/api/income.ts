import axios from 'axios';
import { BACKEND_URL } from '../constants/api';
import type { Income, IncomeFormData } from '../types/finance';

export const createIncome = async (incomeData: IncomeFormData): Promise<Income> => {
    const response = await axios.post(`${BACKEND_URL}/income`, {
        ...incomeData,
        amount: parseFloat(incomeData.amount),
    });
    return response.data;
};

export const getAllIncome = async (): Promise<Income[]> => {
    const response = await axios.get(`${BACKEND_URL}/income`);
    return response.data;
};

export const getIncomeById = async (id: string): Promise<Income> => {
    const response = await axios.get(`${BACKEND_URL}/income/${id}`);
    return response.data;
};

export const updateIncome = async (id: string, incomeData: Partial<IncomeFormData>): Promise<Income> => {
    const payload = { ...incomeData };
    if (incomeData.amount) {
        payload.amount = parseFloat(incomeData.amount) as any;
    }
    const response = await axios.patch(`${BACKEND_URL}/income/${id}`, payload);
    return response.data;
};

export const deleteIncome = async (id: string): Promise<void> => {
    await axios.delete(`${BACKEND_URL}/income/${id}`);
};

export const getTotalIncome = async (startDate?: string, endDate?: string): Promise<number> => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);

    const response = await axios.get(`${BACKEND_URL}/income/stats/total?${params.toString()}`);
    return response.data;
};
