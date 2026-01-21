import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import toast from 'react-hot-toast';
import { createExpense, getAllExpenses, deleteExpense, getTotalExpenses } from '../api/expenses';
import type { Expense, ExpenseFormData, ExpenseCategory, PaymentMethod } from '../types/expenses';
import Loader from '../components/Loader';
import Modal from '../components/common/Modal';
import '../styles/expenses.css';

const Expenses = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
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
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletingExpenseId, setDeletingExpenseId] = useState<string | null>(null);
    const [totalExpenses, setTotalExpenses] = useState<number>(0);
    const [filterCategory, setFilterCategory] = useState<string>('All');

    const categories = [
        'Food & Dining',
        'Transportation',
        'Utilities',
        'Entertainment',
        'Healthcare',
        'Education',
        'Shopping',
        'Housing',
        'Investment',
        'Other',
    ];

    const paymentMethods = [
        'Cash',
        'Credit Card',
        'Debit Card',
        'UPI',
        'Net Banking',
        'Wallet',
    ];

    const fetchExpenses = async () => {
        try {
            const data = await getAllExpenses();
            setExpenses(data);
        } catch (err) {
            console.error(err);
            toast.error('Failed to load expenses');
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const total = await getTotalExpenses();
            setTotalExpenses(total);
        } catch (err) {
            console.error('Failed to fetch stats:', err);
        }
    };

    useEffect(() => {
        fetchExpenses();
        fetchStats();
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await createExpense(formData);
            toast.success('💰 Expense Logged Successfully', {
                style: {
                    background: '#0f0f11',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                },
            });
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
            fetchExpenses();
            fetchStats();
        } catch (err: any) {
            console.error(err);
            toast.error('Failed to create expense');
        }
    };

    const handleDelete = async () => {
        if (!deletingExpenseId) return;
        try {
            await deleteExpense(deletingExpenseId);
            toast.success('🗑️ Expense Deleted', {
                style: {
                    background: '#0f0f11',
                    color: '#fff',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                },
            });
            setShowDeleteModal(false);
            setDeletingExpenseId(null);
            fetchExpenses();
            fetchStats();
        } catch (err) {
            console.error(err);
            toast.error('Failed to delete expense');
        }
    };

    const filteredExpenses = filterCategory === 'All'
        ? expenses
        : expenses.filter(exp => exp.category === filterCategory);

    const getCategoryIcon = (category: string) => {
        const icons: Record<string, string> = {
            'Food & Dining': '🍽️',
            'Transportation': '🚗',
            'Utilities': '💡',
            'Entertainment': '🎮',
            'Healthcare': '⚕️',
            'Education': '📚',
            'Shopping': '🛍️',
            'Housing': '🏠',
            'Investment': '📈',
            'Other': '📦',
        };
        return icons[category] || '💰';
    };

    if (loading) return <Loader />;

    return (
        <div className="expenses-page">
            <div className="bg-gradient"></div>

            <header className="expenses-header">
                <h1>💰 EXPENSE TRACKER</h1>
                <p>Track every penny. Master your finances. Build wealth.</p>
            </header>

            {/* Stats Dashboard */}
            <div className="stats-dashboard">
                <div className="stat-card total-card">
                    <div className="stat-icon">💵</div>
                    <div className="stat-content">
                        <h3>Total Expenses</h3>
                        <p className="stat-value">₹{totalExpenses.toLocaleString()}</p>
                    </div>
                </div>
                <div className="stat-card count-card">
                    <div className="stat-icon">📊</div>
                    <div className="stat-content">
                        <h3>Total Transactions</h3>
                        <p className="stat-value">{expenses.length}</p>
                    </div>
                </div>
                <div className="stat-card avg-card">
                    <div className="stat-icon">📈</div>
                    <div className="stat-content">
                        <h3>Average Expense</h3>
                        <p className="stat-value">
                            ₹{expenses.length > 0 ? (totalExpenses / expenses.length).toFixed(2) : 0}
                        </p>
                    </div>
                </div>
            </div>

            {/* Add Expense Form */}
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
                            <label>Amount (PKR)</label>
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
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {getCategoryIcon(cat)} {cat}
                                    </option>
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
                                {paymentMethods.map((method) => (
                                    <option key={method} value={method}>
                                        {method}
                                    </option>
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
                            placeholder="Add notes about this expense..."
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
                        💾 LOG EXPENSE
                    </button>
                </form>
            </div>

            {/* Filter */}
            <div className="filter-section">
                <label>Filter by Category:</label>
                <select
                    className="premium-select filter-select"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                >
                    <option value="All">All Categories</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {getCategoryIcon(cat)} {cat}
                        </option>
                    ))}
                </select>
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
                                    {expense.isRecurring && (
                                        <span className="recurring-badge">🔄 Recurring</span>
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
                                {expense.description && (
                                    <p className="expense-description">{expense.description}</p>
                                )}
                                <button
                                    className="btn-delete"
                                    onClick={() => {
                                        setDeletingExpenseId(expense._id);
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

            {/* Delete Modal */}
            <Modal
                show={showDeleteModal}
                title="🗑️ DELETE EXPENSE"
                onClose={() => setShowDeleteModal(false)}
                footer={
                    <>
                        <button className="btn-cancel" onClick={() => setShowDeleteModal(false)}>
                            CANCEL
                        </button>
                        <button className="btn-confirm-delete" onClick={handleDelete}>
                            CONFIRM DELETE
                        </button>
                    </>
                }
            >
                <p>Are you sure you want to delete this expense? This action cannot be undone.</p>
            </Modal>
        </div>
    );
};

export default Expenses;
