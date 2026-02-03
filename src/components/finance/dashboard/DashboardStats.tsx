import React from 'react';

interface DashboardStatsProps {
    globalIncome: number;
    globalExpenses: number;
    globalSaved: number;
    globalNetWorth: number;
    periodStats: {
        income: number;
        expense: number;
        netChange: number;
    };
    isFiltered: boolean;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({
    globalIncome,
    globalExpenses,
    globalSaved,
    globalNetWorth,
    periodStats,
    isFiltered
}) => {
    return (
        <div className="stats-dashboard">
            <div className="stat-card total-card">
                <div className="stat-icon" style={{ color: '#10b981', filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.4))' }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                </div>
                <div className="stat-content">
                    <h3>{isFiltered ? 'Period Income' : 'Total Income'}</h3>
                    <p className="stat-value">₹{isFiltered ? periodStats.income.toLocaleString() : globalIncome.toLocaleString()}</p>
                </div>
            </div>
            <div className="stat-card count-card" style={{ borderBottom: '2px solid #ef4444' }}>
                <div className="stat-icon" style={{ color: '#ef4444', filter: 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.4))' }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="1" x2="12" y2="23"></line>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                </div>
                <div className="stat-content">
                    <h3>{isFiltered ? 'Period Expenses' : 'Total Expenses'}</h3>
                    <p className="stat-value" style={{ color: '#ef4444' }}>
                        ₹{isFiltered ? periodStats.expense.toLocaleString() : globalExpenses.toLocaleString()}
                    </p>
                </div>
            </div>
            <div className="stat-card avg-card">
                <div className="stat-icon" style={{ color: '#06b6d4', filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.4))' }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                </div>
                <div className="stat-content">
                    <h3>{isFiltered ? 'Net Change' : 'Total Saved'}</h3>
                    <p className="stat-value" style={{ color: isFiltered ? (periodStats.netChange >= 0 ? '#10b981' : '#ef4444') : 'white' }}>
                        ₹{isFiltered ? periodStats.netChange.toLocaleString() : globalSaved.toLocaleString()}
                    </p>
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
                    <p className="stat-value" style={{ color: globalNetWorth >= 0 ? '#10b981' : '#ef4444' }}>
                        ₹{globalNetWorth.toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default React.memo(DashboardStats);
