import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { Expense } from '../../types/expenses';
import type { Income } from '../../types/finance';

interface FinanceDashboardProps {
    totalIncome: number;
    totalExpenses: number;
    totalSaved: number;
    netWorth: number;
    expenses: Expense[];
    incomes: Income[];
}

const COLORS = ['#fbbf24', '#f59e0b', '#3b82f6', '#10b981', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16', '#f97316'];

const FinanceDashboard: React.FC<FinanceDashboardProps> = ({
    totalIncome,
    totalExpenses,
    totalSaved,
    netWorth,
    expenses,
    incomes
}) => {

    // Alert Logic
    const MAX_MONTHLY_EXPENSE = 20000;
    const isExpenseWarning = totalExpenses >= MAX_MONTHLY_EXPENSE * 0.9;
    const isExpenseCritical = totalExpenses >= MAX_MONTHLY_EXPENSE;

    // Chart Data Computation
    const expenseCategoryData = useMemo(() => {
        const categoryTotals: Record<string, number> = {};
        expenses.forEach(expense => {
            if (!categoryTotals[expense.category]) {
                categoryTotals[expense.category] = 0;
            }
            categoryTotals[expense.category] += expense.amount;
        });
        return Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));
    }, [expenses]);

    const incomeCategoryData = useMemo(() => {
        const categoryTotals: Record<string, number> = {};
        incomes.forEach(income => {
            if (!categoryTotals[income.category]) {
                categoryTotals[income.category] = 0;
            }
            categoryTotals[income.category] += income.amount;
        });
        return Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));
    }, [incomes]);

    const monthlyComparisonData = useMemo(() => {
        const monthlyData: Record<string, { month: string; income: number; expenses: number }> = {};

        expenses.forEach(expense => {
            const month = new Date(expense.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
            if (!monthlyData[month]) {
                monthlyData[month] = { month, income: 0, expenses: 0 };
            }
            monthlyData[month].expenses += expense.amount;
        });

        incomes.forEach(income => {
            const month = new Date(income.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
            if (!monthlyData[month]) {
                monthlyData[month] = { month, income: 0, expenses: 0 };
            }
            monthlyData[month].income += income.amount;
        });

        return Object.values(monthlyData).sort((a, b) => {
            const dateA = new Date(a.month);
            const dateB = new Date(b.month);
            return dateA.getTime() - dateB.getTime();
        }).slice(-6);
    }, [expenses, incomes]);

    return (
        <>
            {/* Overall Stats */}
            <div className="stats-dashboard">
                <div className="stat-card total-card">
                    <div className="stat-icon" style={{ color: '#10b981', filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.4))' }}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                        </svg>
                    </div>
                    <div className="stat-content">
                        <h3>Total Income</h3>
                        <p className="stat-value">₹{totalIncome.toLocaleString()}</p>
                    </div>
                </div>
                <div
                    className={`stat-card count-card ${isExpenseCritical ? 'critical-alert' : isExpenseWarning ? 'warning-alert' : ''}`}
                    style={isExpenseCritical ? { border: '1px solid #ef4444', boxShadow: '0 0 20px rgba(239, 68, 68, 0.4)', background: 'linear-gradient(145deg, rgba(239, 68, 68, 0.1), rgba(0, 0, 0, 0.6))' } : {}}
                >
                    <div className="stat-icon" style={{
                        color: '#ef4444',
                        filter: 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.4))',
                        ...(isExpenseCritical ? { animation: 'pulse 1s infinite' } : {})
                    }}>
                        {isExpenseCritical ? (
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                <line x1="12" y1="9" x2="12" y2="13"></line>
                                <line x1="12" y1="17" x2="12.01" y2="17"></line>
                            </svg>
                        ) : (
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="1" x2="12" y2="23"></line>
                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                            </svg>
                        )}
                    </div>
                    <div className="stat-content">
                        <h3>Total Expenses</h3>
                        <p className="stat-value" style={isExpenseCritical ? { color: '#ef4444' } : {}}>
                            ₹{totalExpenses.toLocaleString()}
                        </p>
                        {isExpenseCritical && (
                            <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                    <line x1="12" y1="9" x2="12" y2="13"></line>
                                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                                </svg>
                                Limit Exceeded (₹{MAX_MONTHLY_EXPENSE / 1000}k)
                            </div>
                        )}
                        {!isExpenseCritical && isExpenseWarning && (
                            <div style={{ color: '#f59e0b', fontSize: '0.75rem', marginTop: '0.25rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                    <line x1="12" y1="9" x2="12" y2="13"></line>
                                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                                </svg>
                                Nearing Limit (₹{MAX_MONTHLY_EXPENSE / 1000}k)
                            </div>
                        )}
                    </div>
                </div>
                <div className="stat-card avg-card">
                    <div className="stat-icon" style={{ color: '#06b6d4', filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.4))' }}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                        </svg>
                    </div>
                    <div className="stat-content">
                        <h3>Total Savings</h3>
                        <p className="stat-value">₹{totalSaved.toLocaleString()}</p>
                    </div>
                </div>
                <div className="stat-card net-card">
                    <div className="stat-icon" style={{ color: '#8b5cf6', filter: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.4))' }}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="20" x2="12" y2="10"></line>
                            <line x1="18" y1="20" x2="18" y2="4"></line>
                            <line x1="6" y1="20" x2="6" y2="16"></line>
                        </svg>
                    </div>
                    <div className="stat-content">
                        <h3>Net Worth</h3>
                        <p className="stat-value" style={{ color: netWorth >= 0 ? '#10b981' : '#ef4444' }}>
                            ₹{netWorth.toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="charts-section">
                <h2 className="charts-heading">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px', color: '#8b5cf6' }}>
                        <line x1="18" y1="20" x2="18" y2="10"></line>
                        <line x1="12" y1="20" x2="12" y2="4"></line>
                        <line x1="6" y1="20" x2="6" y2="14"></line>
                    </svg>
                    Financial Analytics
                </h2>
                <div className="charts-grid">
                    {/* Expense Category Breakdown */}
                    {expenseCategoryData.length > 0 && (
                        <div className="chart-card">
                            <h3>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', color: '#ef4444' }}>
                                    <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                                    <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                                </svg>
                                Expenses by Category
                            </h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={expenseCategoryData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {expenseCategoryData.map((_entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => `₹${(value || 0).toLocaleString()}`} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    )}

                    {/* Income Category Breakdown */}
                    {incomeCategoryData.length > 0 && (
                        <div className="chart-card">
                            <h3>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', color: '#10b981' }}>
                                    <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                                    <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                                </svg>
                                Income by Category
                            </h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={incomeCategoryData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {incomeCategoryData.map((_entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => `₹${(value || 0).toLocaleString()}`} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    )}

                    {/* Monthly Income vs Expenses */}
                    {monthlyComparisonData.length > 0 && (
                        <div className="chart-card chart-card-wide">
                            <h3>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', color: '#3b82f6' }}>
                                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                                    <polyline points="17 6 23 6 23 12"></polyline>
                                </svg>
                                Income vs Expenses (Last 6 Months)
                            </h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={monthlyComparisonData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.7)" />
                                    <YAxis stroke="rgba(255,255,255,0.7)" />
                                    <Tooltip
                                        contentStyle={{
                                            background: 'rgba(15, 15, 17, 0.9)',
                                            border: '1px solid rgba(255,255,255,0.2)',
                                            borderRadius: '8px'
                                        }}
                                        formatter={(value) => `₹${(value || 0).toLocaleString()}`}
                                    />
                                    <Legend />
                                    <Bar dataKey="income" fill="#3b82f6" name="Income" />
                                    <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default React.memo(FinanceDashboard);
