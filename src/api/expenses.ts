import axios from 'axios';
import { BACKEND_URL } from '../constants/api';
import type { Expense, ExpenseFormData, CategoryStats, MonthlyStats } from '../types/expenses';

export const createExpense = async (expenseData: ExpenseFormData): Promise<Expense> => {
    const response = await axios.post(`${BACKEND_URL}/expenses`, {
        ...expenseData,
        amount: parseFloat(expenseData.amount),
    });
    return response.data;
};

export const getAllExpenses = async (): Promise<Expense[]> => {
    const response = await axios.get(`${BACKEND_URL}/expenses`);
    return response.data;
};

export const getExpenseById = async (id: string): Promise<Expense> => {
    const response = await axios.get(`${BACKEND_URL}/expenses/${id}`);
    return response.data;
};

export const updateExpense = async (id: string, expenseData: Partial<ExpenseFormData>): Promise<Expense> => {
    const payload = { ...expenseData };
    if (expenseData.amount) {
        payload.amount = parseFloat(expenseData.amount) as any;
    }
    const response = await axios.patch(`${BACKEND_URL}/expenses/${id}`, payload);
    return response.data;
};

export const deleteExpense = async (id: string): Promise<void> => {
    await axios.delete(`${BACKEND_URL}/expenses/${id}`);
};

export const getCategoryStats = async (startDate?: string, endDate?: string): Promise<CategoryStats[]> => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);

    const response = await axios.get(`${BACKEND_URL}/expenses/stats/category?${params.toString()}`);
    return response.data;
};

export const getMonthlyStats = async (year?: number): Promise<MonthlyStats[]> => {
    const params = year ? `?year=${year}` : '';
    const response = await axios.get(`${BACKEND_URL}/expenses/stats/monthly${params}`);
    return response.data;
};

export const getTotalExpenses = async (startDate?: string, endDate?: string): Promise<number> => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);

    const response = await axios.get(`${BACKEND_URL}/expenses/stats/total?${params.toString()}`);
    return response.data;
};
