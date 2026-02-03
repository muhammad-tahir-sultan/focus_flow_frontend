import React from 'react';
import type { Loan } from '../../../types/loans';
import LoanTypeIcon from './LoanTypeIcon';

interface LoanListProps {
    loans: Loan[];
    onAddPayment: (id: string) => void;
    onDelete: (id: string) => void;
}

const LoanList: React.FC<LoanListProps> = ({ loans, onAddPayment, onDelete }) => {
    return (
        <div className="expenses-list">
            <h2>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '12px', verticalAlign: 'middle' }}>
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                </svg>
                Active Loans
            </h2>
            {loans.length === 0 ? (
                <div className="empty-state">
                    <p>No active loans.</p>
                </div>
            ) : (
                <div className="expenses-grid">
                    {loans.map((loan) => {
                        const progress = (loan.paidAmount / loan.amount) * 100;
                        const isPaid = loan.status === 'Fully Paid';
                        return (
                            <div key={loan._id} className={`expense-card loan-card ${loan.type.toLowerCase()}`}>
                                <div className="expense-header">
                                    <div className={`expense-category-badge ${loan.type === 'Took' ? 'badge-took' : 'badge-gave'}`}>
                                        <span className="category-icon">
                                            <LoanTypeIcon type={loan.type} />
                                        </span>
                                        <span>{loan.type}</span>
                                    </div>
                                    <div className={`status-badge ${loan.status.toLowerCase().replace('_', '-')}`}>
                                        {loan.status.replace('_', ' ')}
                                    </div>
                                </div>
                                <h3 className="expense-title">{loan.title}</h3>
                                <p className="party-name">
                                    {loan.type === 'Took' ? 'From: ' : 'To: '} {loan.partyName}
                                </p>

                                <div className="savings-amounts">
                                    <div className="amount-current">
                                        Paid: ₹{loan.paidAmount.toLocaleString()}
                                    </div>
                                    <div className="amount-target">
                                        Total: ₹{loan.amount.toLocaleString()}
                                    </div>
                                </div>
                                <div className="progress-bar-container">
                                    <div
                                        className="progress-bar-fill"
                                        style={{
                                            width: `${Math.min(progress, 100)}%`,
                                            backgroundColor: loan.type === 'Took' ? '#ef4444' : '#10b981'
                                        }}
                                    ></div>
                                </div>

                                <div className="card-actions">
                                    {!isPaid && (
                                        <button
                                            className="btn-contribute"
                                            onClick={() => onAddPayment(loan._id)}
                                        >
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                                                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                                                <line x1="1" y1="10" x2="23" y2="10"></line>
                                            </svg>
                                            Add Payment
                                        </button>
                                    )}
                                    <button
                                        className="btn-delete-icon"
                                        onClick={() => onDelete(loan._id)}
                                        title="Delete Loan"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                            <line x1="10" y1="11" x2="10" y2="17"></line>
                                            <line x1="14" y1="11" x2="14" y2="17"></line>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default React.memo(LoanList);
