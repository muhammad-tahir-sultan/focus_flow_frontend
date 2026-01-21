import api from './axios';
import type { Loan, LoanFormData } from '../types/loans';

export const getAllLoans = async (): Promise<Loan[]> => {
    const response = await api.get('/loans');
    return response.data;
};

export const getLoan = async (id: string): Promise<Loan> => {
    const response = await api.get(`/loans/${id}`);
    return response.data;
};

export const createLoan = async (loanData: LoanFormData): Promise<Loan> => {
    const payload = {
        ...loanData,
        amount: parseFloat(loanData.amount),
        paidAmount: parseFloat(loanData.paidAmount) || 0,
        interestRate: parseFloat(loanData.interestRate) || 0,
    };
    const response = await api.post('/loans', payload);
    return response.data;
};

export const updateLoan = async (id: string, loanData: Partial<LoanFormData>): Promise<Loan> => {
    const payload: any = { ...loanData };
    if (loanData.amount) payload.amount = parseFloat(loanData.amount);
    if (loanData.paidAmount) payload.paidAmount = parseFloat(loanData.paidAmount);
    if (loanData.interestRate) payload.interestRate = parseFloat(loanData.interestRate);

    const response = await api.patch(`/loans/${id}`, payload);
    return response.data;
};

export const deleteLoan = async (id: string): Promise<void> => {
    await api.delete(`/loans/${id}`);
};

export const addPayment = async (id: string, amount: number): Promise<Loan> => {
    const response = await api.patch(`/loans/${id}/payment`, { amount });
    return response.data;
};

export const getTotalTook = async (): Promise<number> => {
    const response = await api.get('/loans/stats/total-took');
    return response.data;
};

export const getTotalGave = async (): Promise<number> => {
    const response = await api.get('/loans/stats/total-gave');
    return response.data;
};

export const getOutstandingTook = async (): Promise<number> => {
    const response = await api.get('/loans/stats/outstanding-took');
    return response.data;
};

export const getOutstandingGave = async (): Promise<number> => {
    const response = await api.get('/loans/stats/outstanding-gave');
    return response.data;
};
