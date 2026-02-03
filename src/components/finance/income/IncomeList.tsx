import React from 'react';
import type { Income } from '../../../types/finance';
import IncomeIcon from './IncomeIcon';

interface IncomeListProps {
    incomes: Income[];
    onDelete: (id: string) => void;
}

const IncomeList: React.FC<IncomeListProps> = ({ incomes, onDelete }) => {
    return (
        <div className="expenses-list">
            <h2>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '12px', verticalAlign: 'middle' }}>
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
                Recent Income
            </h2>
            {incomes.length === 0 ? (
                <div className="empty-state">
                    <p>No income records found.</p>
                </div>
            ) : (
                <div className="expenses-grid">
                    {incomes.map((income) => (
                        <div key={income._id} className="expense-card">
                            <div className="expense-header">
                                <div className="expense-category-badge income-badge">
                                    <span className="category-icon"><IncomeIcon category={income.category} /></span>
                                    <span>{income.category}</span>
                                </div>
                                {income.isRecurring && (
                                    <span className="recurring-badge">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
                                            <polyline points="23 4 23 10 17 10"></polyline>
                                            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                                        </svg>
                                        Recurring
                                    </span>
                                )}
                            </div>
                            <h3 className="expense-title">{income.title}</h3>
                            <div className="expense-amount income-amount">₹{income.amount.toLocaleString()}</div>
                            <div className="expense-details">
                                <div className="detail-item">
                                    <span className="detail-label">Source:</span>
                                    <span>{income.source}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Date:</span>
                                    <span>{new Date(income.date).toLocaleDateString()}</span>
                                </div>
                            </div>
                            {income.description && <p className="expense-description">{income.description}</p>}
                            <button
                                className="btn-delete"
                                onClick={() => onDelete(income._id)}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                    <line x1="10" y1="11" x2="10" y2="17"></line>
                                    <line x1="14" y1="11" x2="14" y2="17"></line>
                                </svg>
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default React.memo(IncomeList);
