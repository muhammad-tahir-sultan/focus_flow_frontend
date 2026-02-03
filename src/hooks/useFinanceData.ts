import { useState, useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getAllExpenses, getTotalExpenses } from '../api/expenses';
import { getAllIncome, getTotalIncome } from '../api/income';
import { getAllSavings, getTotalSavings } from '../api/savings';
import { getAllLoans, getTotalTook, getTotalGave } from '../api/loans';
import type { Expense } from '../types/expenses';
import type { Income, Saving } from '../types/finance';
import type { Loan } from '../types/loans';

export const useFinanceData = () => {
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

    return {
        loading,
        expenses,
        totalExpenses,
        fetchExpenses,
        incomes,
        totalIncome,
        fetchIncome,
        savings,
        totalSaved,
        fetchSavings,
        loans,
        totalTook,
        totalGave,
        fetchLoans,
        netWorth,
    };
};
