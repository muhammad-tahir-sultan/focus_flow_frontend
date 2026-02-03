import React from 'react';

const FinanceHeader = () => {
    return (
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
    );
};

export default React.memo(FinanceHeader);
