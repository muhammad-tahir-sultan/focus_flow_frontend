import React, { useState, type FormEvent } from 'react';
import toast from 'react-hot-toast';
import { createExpense, deleteExpense } from '../../api/expenses';
import { getCategoryIcon } from '../../utils/financeHelpers';
import Modal from '../common/Modal';
import type { Expense, ExpenseFormData, ExpenseCategory, PaymentMethod } from '../../types/expenses';

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
                <h2>➕ Add New Expense</h2>
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
                                    <option key={cat} value={cat}>{getCategoryIcon(cat)} {cat}</option>
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
                    <button type="submit" className="btn-submit">💾 LOG EXPENSE</button>
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
                            <option key={cat} value={cat}>{getCategoryIcon(cat)} {cat}</option>
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
                        ✕ Clear Dates
                    </button>
                )}
            </div>

            {/* Expenses List */}
            <div className="expenses-list">
                <h2>📋 Recent Expenses</h2>
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
                                        <span className="category-icon">{getCategoryIcon(expense.category)}</span>
                                        <span>{expense.category}</span>
                                    </div>
                                    {expense.isRecurring && <span className="recurring-badge">🔄 Recurring</span>}
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
                                    🗑️ Delete
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
                title="Confirm Deletion"
            >
                <div className="modal-content">
                    <p>Are you sure you want to delete this expense? This action cannot be undone.</p>
                    <div className="modal-actions">
                        <button className="btn-cancel" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                        <button className="btn-delete" onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ExpensesTab;
