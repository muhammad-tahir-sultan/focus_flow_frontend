import React, { useState, type FormEvent } from 'react';
import toast from 'react-hot-toast';
import { createExpense, deleteExpense } from '../../api/expenses';

import Modal from '../common/Modal';
import type { Expense, ExpenseFormData, ExpenseCategory, PaymentMethod } from '../../types/expenses';

// Helper component for Category Icons
const CategoryIcon = ({ category }: { category: string }) => {
    switch (category) {
        case 'Food & Dining': return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>;
        case 'Transportation': return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>;
        case 'Utilities': return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>;
        case 'Entertainment': return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>;
        case 'Healthcare': return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>;
        case 'Education': return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>;
        case 'Shopping': return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>;
        case 'Housing': return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
        case 'Investment': return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>;
        default: return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;
    }
};

interface ExpensesTabProps {
    expenses: Expense[];
    onRefresh: () => void;
}

const ExpensesTab: React.FC<ExpensesTabProps> = ({ expenses, onRefresh }) => {
    // Form State
    const [formData, setFormData] = useState<ExpenseFormData>({
        title: '',
        amount: '',
        category: 'Food & Dining' as ExpenseCategory,
        paymentMethod: 'Cash' as PaymentMethod,
        date: new Date().toISOString().split('T')[0],
        description: '',
        isRecurring: false,
        tags: [],
    });

    // Filter State
    const [filterCategory, setFilterCategory] = useState<string>('All');
    const [filterStartDate, setFilterStartDate] = useState<string>('');
    const [filterEndDate, setFilterEndDate] = useState<string>('');

    // Delete Modal State
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    // Handlers
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await createExpense(formData);
            toast.success('💰 Expense Logged Successfully');
            setFormData({
                title: '',
                amount: '',
                category: 'Food & Dining' as ExpenseCategory,
                paymentMethod: 'Cash' as PaymentMethod,
                date: new Date().toISOString().split('T')[0],
                description: '',
                isRecurring: false,
                tags: [],
            });
            onRefresh();
        } catch (err) {
            toast.error('Failed to create expense');
        }
    };

    const handleDelete = async () => {
        if (!deletingId) return;
        try {
            await deleteExpense(deletingId);
            toast.success('🗑️ Expense Deleted');
            setShowDeleteModal(false);
            setDeletingId(null);
            onRefresh();
        } catch (err) {
            toast.error('Failed to delete expense');
        }
    };

    const filterByDate = (expense: Expense) => {
        if (!filterStartDate && !filterEndDate) return true;
        const expenseDate = new Date(expense.date);
        const startDate = filterStartDate ? new Date(filterStartDate) : null;
        const endDate = filterEndDate ? new Date(filterEndDate) : null;

        if (startDate && expenseDate < startDate) return false;
        if (endDate && expenseDate > endDate) return false;
        return true;
    };

    const filteredExpenses = expenses.filter(exp =>
        (filterCategory === 'All' || exp.category === filterCategory) && filterByDate(exp)
    );

    return (
        <div className="tab-content">
            {/* Expense Form */}
            <div className="expense-form-container">
                <h2>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '12px', verticalAlign: 'middle' }}>
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Add New Expense
                </h2>
                <form onSubmit={handleSubmit} className="expense-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                type="text"
                                className="premium-input"
                                placeholder="e.g., Grocery Shopping"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Amount (₹)</label>
                            <input
                                type="number"
                                step="0.01"
                                className="premium-input"
                                placeholder="0.00"
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Category</label>
                            <select
                                className="premium-select"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value as ExpenseCategory })}
                            >
                                {['Food & Dining', 'Transportation', 'Utilities', 'Entertainment', 'Healthcare', 'Education', 'Shopping', 'Housing', 'Investment', 'Other'].map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Payment Method</label>
                            <select
                                className="premium-select"
                                value={formData.paymentMethod}
                                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as PaymentMethod })}
                            >
                                {['Cash', 'Credit Card', 'Debit Card', 'UPI', 'Net Banking', 'Wallet'].map((method) => (
                                    <option key={method} value={method}>{method}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Date</label>
                            <input
                                type="date"
                                className="premium-input"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Description (Optional)</label>
                        <textarea
                            className="premium-input"
                            placeholder="Add notes..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={2}
                        />
                    </div>
                    <div className="form-group checkbox-group">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={formData.isRecurring}
                                onChange={(e) => setFormData({ ...formData, isRecurring: e.target.checked })}
                            />
                            <span>Recurring Expense</span>
                        </label>
                    </div>
                    <button type="submit" className="btn-submit">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                            <polyline points="17 21 17 13 7 13 7 21"></polyline>
                            <polyline points="7 3 7 8 15 8"></polyline>
                        </svg>
                        LOG EXPENSE
                    </button>
                </form>
            </div>


            {/* Filter */}
            <div className="filter-section">
                <div className="filter-group">
                    <label>Filter by Category:</label>
                    <select
                        className="premium-select filter-select"
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                    >
                        <option value="All">All Categories</option>
                        {['Food & Dining', 'Transportation', 'Utilities', 'Entertainment', 'Healthcare', 'Education', 'Shopping', 'Housing', 'Investment', 'Other'].map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <div className="filter-group">
                    <label>From Date:</label>
                    <input
                        type="date"
                        className="premium-input filter-date"
                        value={filterStartDate}
                        onChange={(e) => setFilterStartDate(e.target.value)}
                    />
                </div>
                <div className="filter-group">
                    <label>To Date:</label>
                    <input
                        type="date"
                        className="premium-input filter-date"
                        value={filterEndDate}
                        onChange={(e) => setFilterEndDate(e.target.value)}
                    />
                </div>
                {(filterStartDate || filterEndDate) && (
                    <button
                        className="btn-clear-filter"
                        onClick={() => {
                            setFilterStartDate('');
                            setFilterEndDate('');
                        }}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                        Clear Dates
                    </button>
                )}
            </div>

            {/* Expenses List */}
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
                {filteredExpenses.length === 0 ? (
                    <div className="empty-state">
                        <p>No expenses found. Start tracking your spending!</p>
                    </div>
                ) : (
                    <div className="expenses-grid">
                        {filteredExpenses.map((expense) => (
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
                                    onClick={() => {
                                        setDeletingId(expense._id);
                                        setShowDeleteModal(true);
                                    }}
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

            {/* Delete Confirmation Modal */}
            <Modal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                title="⚠️ Confirm Deletion"
            >
                <div className="delete-modal-content">
                    {deletingId && (() => {
                        const expense = expenses.find(e => e._id === deletingId);
                        if (!expense) return null;

                        return (
                            <>
                                <div className="delete-warning">
                                    <div className="warning-icon">
                                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                            <line x1="12" y1="9" x2="12" y2="13"></line>
                                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                                        </svg>
                                    </div>
                                    <p className="warning-text">
                                        You're about to permanently delete this expense. This action cannot be undone.
                                    </p>
                                </div>

                                <div className="expense-preview">
                                    <h4>Expense Details</h4>
                                    <div className="preview-item">
                                        <span className="preview-label">Title:</span>
                                        <span className="preview-value">{expense.title}</span>
                                    </div>
                                    <div className="preview-item">
                                        <span className="preview-label">Amount:</span>
                                        <span className="preview-value amount">₹{expense.amount.toLocaleString()}</span>
                                    </div>
                                    <div className="preview-item">
                                        <span className="preview-label">Category:</span>
                                        <span className="preview-value" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <CategoryIcon category={expense.category} /> {expense.category}
                                        </span>
                                    </div>
                                    <div className="preview-item">
                                        <span className="preview-label">Date:</span>
                                        <span className="preview-value">{new Date(expense.date).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                <div className="modal-actions">
                                    <button className="btn-cancel-modal" onClick={() => setShowDeleteModal(false)}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                                        Cancel
                                    </button>
                                    <button className="btn-delete-modal" onClick={handleDelete}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                            <line x1="10" y1="11" x2="10" y2="17"></line>
                                            <line x1="14" y1="11" x2="14" y2="17"></line>
                                        </svg>
                                        Delete Expense
                                    </button>
                                </div>
                            </>
                        );
                    })()}
                </div>
            </Modal>
        </div>
    );
};

export default React.memo(ExpensesTab);
