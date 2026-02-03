import React from 'react';

interface LoanStatsProps {
    totalTook: number;
    totalGave: number;
}

const LoanStats: React.FC<LoanStatsProps> = ({ totalTook, totalGave }) => {
    return (
        <div className="loan-stats-container">
            <div className="loan-stat-card took">
                <div className="icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                        <polyline points="17 6 23 6 23 12"></polyline>
                    </svg>
                </div>
                <div className="content">
                    <h3>You Borrowed (Took)</h3>
                    <p>₹{totalTook.toLocaleString()}</p>
                </div>
            </div>
            <div className="loan-stat-card gave">
                <div className="icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
                        <polyline points="17 18 23 18 23 12"></polyline>
                    </svg>
                </div>
                <div className="content">
                    <h3>You Lent (Gave)</h3>
                    <p>₹{totalGave.toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
};

export default React.memo(LoanStats);
