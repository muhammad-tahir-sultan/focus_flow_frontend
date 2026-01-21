import api from './axios';
import type { Expense, ExpenseFormData, CategoryStats, MonthlyStats } from '../types/expenses';

export const createExpense = async (expenseData: ExpenseFormData): Promise<Expense> => {
    const response = await api.post('/expenses', {
        ...expenseData,
        amount: parseFloat(expenseData.amount),
    });
    return response.data;
};

export const getAllExpenses = async (): Promise<Expense[]> => {
    const response = await api.get('/expenses');
    return response.data;
};

export const getExpenseById = async (id: string): Promise<Expense> => {
    const response = await api.get(`/expenses/${id}`);
    return response.data;
};

export const updateExpense = async (id: string, expenseData: Partial<ExpenseFormData>): Promise<Expense> => {
    const payload: any = { ...expenseData };
    if (expenseData.amount) {
        payload.amount = parseFloat(expenseData.amount);
    }
    const response = await api.patch(`/expenses/${id}`, payload);
    return response.data;
};

export const deleteExpense = async (id: string): Promise<void> => {
    await api.delete(`/expenses/${id}`);
};

export const getCategoryStats = async (startDate?: string, endDate?: string): Promise<CategoryStats[]> => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);

    const response = await api.get(`/expenses/stats/category?${params.toString()}`);
    return response.data;
};

export const getMonthlyStats = async (year?: number): Promise<MonthlyStats[]> => {
    const params = year ? `?year=${year}` : '';
    const response = await api.get(`/expenses/stats/monthly${params}`);
    return response.data;
};

export const getTotalExpenses = async (startDate?: string, endDate?: string): Promise<number> => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);

    const response = await api.get(`/expenses/stats/total?${params.toString()}`);
    return response.data;
};
