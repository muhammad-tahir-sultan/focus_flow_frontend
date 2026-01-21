import axios from 'axios';
import { BACKEND_URL } from '../constants/api';
import type { Saving, SavingFormData } from '../types/finance';

export const createSaving = async (savingData: SavingFormData): Promise<Saving> => {
    const response = await axios.post(`${BACKEND_URL}/savings`, {
        ...savingData,
        targetAmount: parseFloat(savingData.targetAmount),
        currentAmount: parseFloat(savingData.currentAmount || '0'),
        monthlyContribution: savingData.monthlyContribution ? parseFloat(savingData.monthlyContribution) : undefined,
    });
    return response.data;
};

export const getAllSavings = async (): Promise<Saving[]> => {
    const response = await axios.get(`${BACKEND_URL}/savings`);
    return response.data;
};

export const getSavingById = async (id: string): Promise<Saving> => {
    const response = await axios.get(`${BACKEND_URL}/savings/${id}`);
    return response.data;
};

export const updateSaving = async (id: string, savingData: Partial<SavingFormData>): Promise<Saving> => {
    const payload: any = { ...savingData };
    if (savingData.targetAmount) payload.targetAmount = parseFloat(savingData.targetAmount);
    if (savingData.currentAmount) payload.currentAmount = parseFloat(savingData.currentAmount);
    if (savingData.monthlyContribution) payload.monthlyContribution = parseFloat(savingData.monthlyContribution);

    const response = await axios.patch(`${BACKEND_URL}/savings/${id}`, payload);
    return response.data;
};

export const addContribution = async (id: string, amount: number): Promise<Saving> => {
    const response = await axios.patch(`${BACKEND_URL}/savings/${id}/contribute`, { amount });
    return response.data;
};

export const deleteSaving = async (id: string): Promise<void> => {
    await axios.delete(`${BACKEND_URL}/savings/${id}`);
};

export const getTotalSavings = async (): Promise<number> => {
    const response = await axios.get(`${BACKEND_URL}/savings/stats/total`);
    return response.data;
};

export const getTotalTargets = async (): Promise<number> => {
    const response = await axios.get(`${BACKEND_URL}/savings/stats/targets`);
    return response.data;
};
