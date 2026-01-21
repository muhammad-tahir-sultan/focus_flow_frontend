import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
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

    // Fetch Functions
    const fetchExpenses = async () => {
        try {
            const [data, total] = await Promise.all([getAllExpenses(), getTotalExpenses()]);
            setExpenses(data);
            setTotalExpenses(total);
        } catch (err) {
            console.error(err);
            toast.error('Failed to load expenses');
        }
    };

    const fetchIncome = async () => {
        try {
            const [data, total] = await Promise.all([getAllIncome(), getTotalIncome()]);
            setIncomes(data);
            setTotalIncome(total);
        } catch (err) {
            console.error(err);
            toast.error('Failed to load income');
        }
    };

    const fetchSavings = async () => {
        try {
            const [data, saved] = await Promise.all([getAllSavings(), getTotalSavings()]);
            setSavings(data);
            setTotalSaved(saved);
        } catch (err) {
            console.error(err);
            toast.error('Failed to load savings');
        }
    };

    const fetchLoans = async () => {
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
    };

    useEffect(() => {
        const fetchAll = async () => {
            await Promise.all([fetchExpenses(), fetchIncome(), fetchSavings(), fetchLoans()]);
            setLoading(false);
        };
        fetchAll();
    }, []);

    if (loading) return <Loader />;

    return (
        <div className="expenses-page">
            <div className="bg-gradient"></div>

            <header className="expenses-header">
                <h1>💰 FINANCIAL DASHBOARD</h1>
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
                    💸 Expenses
                </button>
                <button
                    className={`tab-btn ${activeTab === 'income' ? 'active' : ''}`}
                    onClick={() => setActiveTab('income')}
                >
                    💵 Income
                </button>
                <button
                    className={`tab-btn ${activeTab === 'savings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('savings')}
                >
                    🎯 Savings
                </button>
                <button
                    className={`tab-btn ${activeTab === 'loans' ? 'active' : ''}`}
                    onClick={() => setActiveTab('loans')}
                >
                    🤝 Loans
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
