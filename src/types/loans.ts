// Loan Types
export type LoanType = 'Took' | 'Gave';
export type LoanStatus = 'Active' | 'Partially Paid' | 'Fully Paid' | 'Defaulted';

export interface Loan {
    _id: string;
    title: string;
    amount: number;
    paidAmount: number;
    type: LoanType;
    partyName: string;
    date: string;
    dueDate?: string;
    interestRate: number;
    status: LoanStatus;
    description?: string;
    tags: string[];
    createdAt: string;
    updatedAt: string;
}

export interface LoanFormData {
    title: string;
    amount: string;
    paidAmount: string;
    type: LoanType;
    partyName: string;
    date: string;
    dueDate: string;
    interestRate: string;
    description: string;
    tags: string[];
}
