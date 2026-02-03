import { useState } from 'react';
import { useFinanceData } from '../hooks/useFinanceData';
import FinanceSkeleton from '../components/finance/FinanceSkeleton';
import FinanceDashboard from '../components/finance/FinanceDashboard';
import FinanceHeader from '../components/finance/shared/FinanceHeader';
import FinanceTabsNav, { type TabType } from '../components/finance/shared/FinanceTabsNav';
import ExpensesTab from '../components/finance/ExpensesTab';
import IncomeTab from '../components/finance/IncomeTab';
import SavingsTab from '../components/finance/SavingsTab';
import LoansTab from '../components/finance/LoansTab';

import '../styles/expenses.css';

const Finance = () => {
    const [activeTab, setActiveTab] = useState<TabType>('expenses');

    // Use custom hook for all data logic
    const {
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
        netWorth
    } = useFinanceData();

    if (loading) return <FinanceSkeleton />;

    return (
        <div className="expenses-page">
            <div className="bg-gradient"></div>

            <FinanceHeader />

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
            <FinanceTabsNav activeTab={activeTab} setActiveTab={setActiveTab} />

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

