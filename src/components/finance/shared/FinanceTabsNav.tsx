import React from 'react';

export type TabType = 'expenses' | 'income' | 'savings' | 'loans';

interface FinanceTabsNavProps {
    activeTab: TabType;
    setActiveTab: (tab: TabType) => void;
}

const FinanceTabsNav: React.FC<FinanceTabsNavProps> = ({ activeTab, setActiveTab }) => {
    return (
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
    );
};

export default React.memo(FinanceTabsNav);
