import React, { useState } from 'react';
import type { Expense } from '../../types/expenses';
import type { Income } from '../../types/finance';
import { useDashboardAnalytics } from '../../hooks/useDashboardAnalytics';
import DateRangeFilter from './analytics/DateRangeFilter';
import DashboardStats from './dashboard/DashboardStats';
import WealthTrendChart from './dashboard/charts/WealthTrendChart';
import MonthlyBreakdownChart from './dashboard/charts/MonthlyBreakdownChart';
import CategoryPieChart from './dashboard/charts/CategoryPieChart';

interface FinanceDashboardProps {
    totalIncome: number;
    totalExpenses: number;
    totalSaved: number;
    netWorth: number;
    expenses: Expense[];
    incomes: Income[];
}

const FinanceDashboard: React.FC<FinanceDashboardProps> = ({
    totalIncome,
    totalExpenses,
    totalSaved,
    netWorth,
    expenses,
    incomes
}) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const {
        periodStats,
        chartData,
        wealthTrendData,
        expenseCategoryData,
        incomeCategoryData
    } = useDashboardAnalytics(expenses, incomes, startDate, endDate);

    const isFiltered = !!(startDate || endDate);

    return (
        <>
            <DateRangeFilter
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
                onClear={() => { setStartDate(''); setEndDate(''); }}
            />

            <DashboardStats
                globalIncome={totalIncome}
                globalExpenses={totalExpenses}
                globalSaved={totalSaved}
                globalNetWorth={netWorth}
                periodStats={periodStats}
                isFiltered={isFiltered}
            />

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

                <WealthTrendChart data={wealthTrendData} />

                <div className="charts-grid">
                    <MonthlyBreakdownChart data={chartData} />

                    <CategoryPieChart
                        data={expenseCategoryData}
                        title="Expenses by Category"
                        iconColor="#ef4444"
                    />

                    <CategoryPieChart
                        data={incomeCategoryData}
                        title="Income by Category"
                        iconColor="#10b981"
                    />
                </div>
            </div>
        </>
    );
};

export default React.memo(FinanceDashboard);
