export interface Income {
    _id: string;
    title: string;
    amount: number;
    category: IncomeCategory;
    source: IncomeSource;
    date: string;
    description?: string;
    isRecurring: boolean;
    tags?: string[];
    createdAt: string;
    updatedAt: string;
}

export type IncomeCategory =
    | 'Salary'
    | 'Freelance'
    | 'Business'
    | 'Investment Returns'
    | 'Rental Income'
    | 'Bonus'
    | 'Gift'
    | 'Refund'
    | 'Other';

export type IncomeSource =
    | 'Primary Job'
    | 'Side Hustle'
    | 'Passive Income'
    | 'One-time';

export interface IncomeFormData {
    title: string;
    amount: string;
    category: IncomeCategory;
    source: IncomeSource;
    date: string;
    description?: string;
    isRecurring: boolean;
    tags?: string[];
}

export interface Saving {
    _id: string;
    title: string;
    targetAmount: number;
    currentAmount: number;
    goalType: SavingGoalType;
    targetDate: string;
    status: SavingStatus;
    description?: string;
    monthlyContribution?: number;
    tags?: string[];
    createdAt: string;
    updatedAt: string;
}

export type SavingGoalType =
    | 'Emergency Fund'
    | 'Retirement'
    | 'Investment'
    | 'Education'
    | 'House/Property'
    | 'Vehicle'
    | 'Vacation'
    | 'Wedding'
    | 'Business'
    | 'Other';

export type SavingStatus =
    | 'In Progress'
    | 'Completed'
    | 'Paused';

export interface SavingFormData {
    title: string;
    targetAmount: string;
    currentAmount: string;
    goalType: SavingGoalType;
    targetDate: string;
    description?: string;
    monthlyContribution?: string;
    tags?: string[];
}
