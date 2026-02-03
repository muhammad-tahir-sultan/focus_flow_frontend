import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import FinanceSkeleton from '../components/finance/FinanceSkeleton';
import FinanceDashboard from '../components/finance/FinanceDashboard';
import ExpensesTab from '../components/finance/ExpensesTab';
import IncomeTab from '../components/finance/IncomeTab';
import SavingsTab from '../components/finance/SavingsTab';
import LoansTab from '../components/finance/LoansTab';

import { getAllExpenses, getTotalExpenses } from '../api/expenses';
import { getAllIncome, getTotalIncome } from '../api/income';
import { getAllSavings, getTotalSavings } from '../api/savings';
import { getAllLoans, getTotalTook, getTotalGave } from '../api/loans';

import type { Expense } from '../types/expenses';
import type { Income, Saving } from '../types/finance';
import type { Loan } from '../types/loans';

import '../styles/expenses.css';

type TabType = 'expenses' | 'income' | 'savings' | 'loans';

const Finance = () => {
    const [activeTab, setActiveTab] = useState<TabType>('expenses');
    const [loading, setLoading] = useState(true);

    // Data State
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [totalExpenses, setTotalExpenses] = useState<number>(0);

    const [incomes, setIncomes] = useState<Income[]>([]);
    const [totalIncome, setTotalIncome] = useState<number>(0);

    const [savings, setSavings] = useState<Saving[]>([]);
    const [totalSaved, setTotalSaved] = useState<number>(0);

    const [loans, setLoans] = useState<Loan[]>([]);
    const [totalTook, setTotalTook] = useState<number>(0);
    const [totalGave, setTotalGave] = useState<number>(0);

    const netWorth = totalIncome - totalExpenses + totalSaved + totalGave - totalTook;

    // Fetch Functions - Memoized with useCallback
    const fetchExpenses = useCallback(async () => {
        try {
            const [data, total] = await Promise.all([getAllExpenses(), getTotalExpenses()]);
            setExpenses(data);
            setTotalExpenses(total);
        } catch (err) {
            console.error(err);
            toast.error('Failed to load expenses');
        }
    }, []);

    const fetchIncome = useCallback(async () => {
        try {
            const [data, total] = await Promise.all([getAllIncome(), getTotalIncome()]);
            setIncomes(data);
            setTotalIncome(total);
        } catch (err) {
            console.error(err);
            toast.error('Failed to load income');
        }
    }, []);

    const fetchSavings = useCallback(async () => {
        try {
            const [data, saved] = await Promise.all([getAllSavings(), getTotalSavings()]);
            setSavings(data);
            setTotalSaved(saved);
        } catch (err) {
            console.error(err);
            toast.error('Failed to load savings');
        }
    }, []);

    const fetchLoans = useCallback(async () => {
        try {
            const [data, took, gave] = await Promise.all([
                getAllLoans(),
                getTotalTook(),
                getTotalGave()
            ]);
            setLoans(data);
            setTotalTook(took);
            setTotalGave(gave);
        } catch (err) {
            console.error(err);
            toast.error('Failed to load loans');
        }
    }, []);

    useEffect(() => {
        const fetchAll = async () => {
            await Promise.all([fetchExpenses(), fetchIncome(), fetchSavings(), fetchLoans()]);
            setLoading(false);
        };
        fetchAll();
    }, [fetchExpenses, fetchIncome, fetchSavings, fetchLoans]);

    if (loading) return <FinanceSkeleton />;

    return (
        <div className="expenses-page">
            <div className="bg-gradient"></div>

            <header className="expenses-header">
                <h1>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '12px', verticalAlign: 'middle', filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.5))' }}>
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                        <line x1="12" y1="22" x2="12" y2="7"></line>
                        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
                        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
                    </svg>
                    FINANCIAL DASHBOARD
                </h1>
                <p>Track income, expenses, and savings. Master your financial future.</p>
            </header>

            {/* Dashboard (Stats & Charts) */}
            <FinanceDashboard
                totalIncome={totalIncome}
                totalExpenses={totalExpenses}
                totalSaved={totalSaved}
                netWorth={netWorth}
                expenses={expenses}
                incomes={incomes}
            />

            {/* Tabs */}
            <div className="finance-tabs">
                <button
                    className={`tab-btn ${activeTab === 'expenses' ? 'active' : ''}`}
                    onClick={() => setActiveTab('expenses')}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={activeTab === 'expenses' ? '#ef4444' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', filter: activeTab === 'expenses' ? 'drop-shadow(0 0 6px rgba(239, 68, 68, 0.4))' : 'none', transition: 'all 0.3s ease' }}>
                        <line x1="12" y1="1" x2="12" y2="23"></line>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                    Expenses
                </button>
                <button
                    className={`tab-btn ${activeTab === 'income' ? 'active' : ''}`}
                    onClick={() => setActiveTab('income')}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={activeTab === 'income' ? '#10b981' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', filter: activeTab === 'income' ? 'drop-shadow(0 0 6px rgba(16, 185, 129, 0.4))' : 'none', transition: 'all 0.3s ease' }}>
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                    Income
                </button>
                <button
                    className={`tab-btn ${activeTab === 'savings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('savings')}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={activeTab === 'savings' ? '#06b6d4' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', filter: activeTab === 'savings' ? 'drop-shadow(0 0 6px rgba(6, 182, 212, 0.4))' : 'none', transition: 'all 0.3s ease' }}>
                        <circle cx="12" cy="12" r="10"></circle>
                        <circle cx="12" cy="12" r="6"></circle>
                        <circle cx="12" cy="12" r="2"></circle>
                    </svg>
                    Savings
                </button>
                <button
                    className={`tab-btn ${activeTab === 'loans' ? 'active' : ''}`}
                    onClick={() => setActiveTab('loans')}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={activeTab === 'loans' ? '#8b5cf6' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', filter: activeTab === 'loans' ? 'drop-shadow(0 0 6px rgba(139, 92, 246, 0.4))' : 'none', transition: 'all 0.3s ease' }}>
                        <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
                    </svg>
                    Loans
                </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'expenses' && (
                <ExpensesTab
                    expenses={expenses}
                    onRefresh={fetchExpenses}
                />
            )}

            {activeTab === 'income' && (
                <IncomeTab
                    incomes={incomes}
                    onRefresh={fetchIncome}
                />
            )}

            {activeTab === 'savings' && (
                <SavingsTab
                    savings={savings}
                    onRefresh={fetchSavings}
                />
            )}

            {activeTab === 'loans' && (
                <LoansTab
                    loans={loans}
                    totalTook={totalTook}
                    totalGave={totalGave}
                    onRefresh={fetchLoans}
                />
            )}
        </div>
    );
};

export default Finance;
