import React from 'react';
import type { Expense } from '../../../types/expenses';
import CategoryIcon from './CategoryIcon';

interface ExpenseListProps {
    expenses: Expense[];
    onDelete: (id: string) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDelete }) => {
    return (
        <div className="expenses-list">
            <h2>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '12px', verticalAlign: 'middle' }}>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                Recent Expenses
            </h2>
            {expenses.length === 0 ? (
                <div className="empty-state">
                    <p>No expenses found. Start tracking your spending!</p>
                </div>
            ) : (
                <div className="expenses-grid">
                    {expenses.map((expense) => (
                        <div key={expense._id} className="expense-card">
                            <div className="expense-header">
                                <div className="expense-category-badge">
                                    <span className="category-icon"><CategoryIcon category={expense.category} /></span>
                                    <span>{expense.category}</span>
                                </div>
                                {expense.isRecurring && (
                                    <span className="recurring-badge">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
                                            <polyline points="23 4 23 10 17 10"></polyline>
                                            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                                        </svg>
                                        Recurring
                                    </span>
                                )}
                            </div>
                            <h3 className="expense-title">{expense.title}</h3>
                            <div className="expense-amount">₹{expense.amount.toLocaleString()}</div>
                            <div className="expense-details">
                                <div className="detail-item">
                                    <span className="detail-label">Payment:</span>
                                    <span>{expense.paymentMethod}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Date:</span>
                                    <span>{new Date(expense.date).toLocaleDateString()}</span>
                                </div>
                            </div>
                            {expense.description && <p className="expense-description">{expense.description}</p>}
                            <button
                                className="btn-delete"
                                onClick={() => onDelete(expense._id)}
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

export default React.memo(ExpenseList);
