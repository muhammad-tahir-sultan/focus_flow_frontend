export interface Expense {
    _id: string;
    title: string;
    amount: number;
    category: ExpenseCategory;
    paymentMethod: PaymentMethod;
    date: string;
    description?: string;
    isRecurring: boolean;
    tags?: string[];
    createdAt: string;
    updatedAt: string;
}

export type ExpenseCategory =
    | 'Food & Dining'
    | 'Transportation'
    | 'Utilities'
    | 'Entertainment'
    | 'Healthcare'
    | 'Education'
    | 'Shopping'
    | 'Housing'
    | 'Investment'
    | 'Other';

export type PaymentMethod =
    | 'Cash'
    | 'Credit Card'
    | 'Debit Card'
    | 'UPI'
    | 'Net Banking'
    | 'Wallet';

export interface ExpenseFormData {
    title: string;
    amount: string;
    category: ExpenseCategory;
    paymentMethod: PaymentMethod;
    date: string;
    description?: string;
    isRecurring: boolean;
    tags?: string[];
}

export interface CategoryStats {
    _id: string;
    total: number;
    count: number;
}

export interface MonthlyStats {
    _id: number;
    total: number;
    count: number;
}
