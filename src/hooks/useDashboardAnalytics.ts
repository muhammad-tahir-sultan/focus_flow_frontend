import { useMemo } from 'react';
import type { Expense } from '../types/expenses';
import type { Income } from '../types/finance';

export const useDashboardAnalytics = (
    expenses: Expense[],
    incomes: Income[],
    startDate: string,
    endDate: string
) => {
    // Filter Data Logic
    const { filteredExpenses, filteredIncomes } = useMemo(() => {
        if (!startDate && !endDate) return { filteredExpenses: expenses, filteredIncomes: incomes };

        const start = startDate ? new Date(startDate) : new Date(0);
        const end = endDate ? new Date(endDate) : new Date(8640000000000000);
        end.setHours(23, 59, 59, 999);

        return {
            filteredExpenses: expenses.filter(e => {
                const d = new Date(e.date);
                return d >= start && d <= end;
            }),
            filteredIncomes: incomes.filter(i => {
                const d = new Date(i.date);
                return d >= start && d <= end;
            })
        };
    }, [expenses, incomes, startDate, endDate]);

    // Calculate Period Stats
    const periodStats = useMemo(() => {
        const income = filteredIncomes.reduce((acc, curr) => acc + curr.amount, 0);
        const expense = filteredExpenses.reduce((acc, curr) => acc + curr.amount, 0);
        const netChange = income - expense;
        return { income, expense, netChange };
    }, [filteredExpenses, filteredIncomes]);

    // Chart Data: detailed monthly stats over the filtered range
    const chartData = useMemo(() => {
        const monthlyData: Record<string, { date: string; displayDate: string; income: number; expenses: number; net: number }> = {};
        const getKey = (dateStr: string) => dateStr.substring(0, 7);

        filteredExpenses.forEach(e => {
            const key = getKey(e.date);
            if (!monthlyData[key]) {
                const dateObj = new Date(e.date);
                monthlyData[key] = {
                    date: key,
                    displayDate: dateObj.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
                    income: 0,
                    expenses: 0,
                    net: 0
                };
            }
            monthlyData[key].expenses += e.amount;
            monthlyData[key].net -= e.amount;
        });

        filteredIncomes.forEach(i => {
            const key = getKey(i.date);
            if (!monthlyData[key]) {
                const dateObj = new Date(i.date);
                monthlyData[key] = {
                    date: key,
                    displayDate: dateObj.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
                    income: 0,
                    expenses: 0,
                    net: 0
                };
            }
            monthlyData[key].income += i.amount;
            monthlyData[key].net += i.amount;
        });

        return Object.values(monthlyData).sort((a, b) => a.date.localeCompare(b.date));
    }, [filteredExpenses, filteredIncomes]);

    // Wealth Growth Data
    const wealthTrendData = useMemo(() => {
        const allTransactions = [
            ...filteredIncomes.map(i => ({ date: new Date(i.date), amount: i.amount, type: 'income' })),
            ...filteredExpenses.map(e => ({ date: new Date(e.date), amount: -e.amount, type: 'expense' }))
        ].sort((a, b) => a.date.getTime() - b.date.getTime());

        let runningBalance = 0;
        const dailyMap: Record<string, number> = {};

        allTransactions.forEach(t => {
            runningBalance += t.amount;
            const dayKey = t.date.toISOString().split('T')[0];
            dailyMap[dayKey] = runningBalance;
        });

        return Object.entries(dailyMap).map(([date, balance]) => ({
            date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            balance
        }));
    }, [filteredExpenses, filteredIncomes]);

    const expenseCategoryData = useMemo(() => {
        const categoryTotals: Record<string, number> = {};
        filteredExpenses.forEach(e => {
            categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
        });
        return Object.entries(categoryTotals).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
    }, [filteredExpenses]);

    const incomeCategoryData = useMemo(() => {
        const categoryTotals: Record<string, number> = {};
        filteredIncomes.forEach(i => {
            categoryTotals[i.category] = (categoryTotals[i.category] || 0) + i.amount;
        });
        return Object.entries(categoryTotals).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
    }, [filteredIncomes]);

    return {
        filteredExpenses,
        filteredIncomes,
        periodStats,
        chartData,
        wealthTrendData,
        expenseCategoryData,
        incomeCategoryData
    };
};
