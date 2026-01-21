import axios from 'axios';
import type { Loan, LoanFormData } from '../types/loans';

const API_URL = 'http://localhost:3000/loans';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return { headers: { Authorization: `Bearer ${token}` } };
};

export const getAllLoans = async (): Promise<Loan[]> => {
    const response = await axios.get(API_URL, getAuthHeaders());
    return response.data;
};

export const getLoan = async (id: string): Promise<Loan> => {
    const response = await axios.get(`${API_URL}/${id}`, getAuthHeaders());
    return response.data;
};

export const createLoan = async (loanData: LoanFormData): Promise<Loan> => {
    const payload = {
        ...loanData,
        amount: parseFloat(loanData.amount),
        paidAmount: parseFloat(loanData.paidAmount) || 0,
        interestRate: parseFloat(loanData.interestRate) || 0,
    };
    const response = await axios.post(API_URL, payload, getAuthHeaders());
    return response.data;
};

export const updateLoan = async (id: string, loanData: Partial<LoanFormData>): Promise<Loan> => {
    const payload: any = { ...loanData };
    if (loanData.amount) payload.amount = parseFloat(loanData.amount);
    if (loanData.paidAmount) payload.paidAmount = parseFloat(loanData.paidAmount);
    if (loanData.interestRate) payload.interestRate = parseFloat(loanData.interestRate);

    const response = await axios.patch(`${API_URL}/${id}`, payload, getAuthHeaders());
    return response.data;
};

export const deleteLoan = async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
};

export const addPayment = async (id: string, amount: number): Promise<Loan> => {
    const response = await axios.patch(`${API_URL}/${id}/payment`, { amount }, getAuthHeaders());
    return response.data;
};

export const getTotalTook = async (): Promise<number> => {
    const response = await axios.get(`${API_URL}/stats/total-took`, getAuthHeaders());
    return response.data;
};

export const getTotalGave = async (): Promise<number> => {
    const response = await axios.get(`${API_URL}/stats/total-gave`, getAuthHeaders());
    return response.data;
};

export const getOutstandingTook = async (): Promise<number> => {
    const response = await axios.get(`${API_URL}/stats/outstanding-took`, getAuthHeaders());
    return response.data;
};

export const getOutstandingGave = async (): Promise<number> => {
    const response = await axios.get(`${API_URL}/stats/outstanding-gave`, getAuthHeaders());
    return response.data;
};
