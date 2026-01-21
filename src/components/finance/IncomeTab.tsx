import React, { useState } from 'react';
import type { FormEvent } from 'react';
import toast from 'react-hot-toast';
import { createIncome, deleteIncome } from '../../api/income';
import { getCategoryIcon } from '../../utils/financeHelpers';
import Modal from '../common/Modal';
import type { Income, IncomeFormData, IncomeCategory, IncomeSource } from '../../types/finance';

interface IncomeTabProps {
    incomes: Income[];
    onRefresh: () => void;
}

const IncomeTab: React.FC<IncomeTabProps> = ({ incomes, onRefresh }) => {
    // Form State
    const [formData, setFormData] = useState<IncomeFormData>({
        title: '',
        amount: '',
        category: 'Salary' as IncomeCategory,
        source: 'Primary Job' as IncomeSource,
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
            await createIncome(formData);
            toast.success('💵 Income Logged Successfully');
            setFormData({
                title: '',
                amount: '',
                category: 'Salary' as IncomeCategory,
                source: 'Primary Job' as IncomeSource,
                date: new Date().toISOString().split('T')[0],
                description: '',
                isRecurring: false,
                tags: [],
            });
            onRefresh();
        } catch (err) {
            toast.error('Failed to create income');
        }
    };

    const handleDelete = async () => {
        if (!deletingId) return;
        try {
            await deleteIncome(deletingId);
            toast.success('🗑️ Income Deleted');
            setShowDeleteModal(false);
            setDeletingId(null);
            onRefresh();
        } catch (err) {
            toast.error('Failed to delete income');
        }
    };

    const filterByDate = (income: Income) => {
        if (!filterStartDate && !filterEndDate) return true;
        const incomeDate = new Date(income.date);
        const startDate = filterStartDate ? new Date(filterStartDate) : null;
        const endDate = filterEndDate ? new Date(filterEndDate) : null;

        if (startDate && incomeDate < startDate) return false;
        if (endDate && incomeDate > endDate) return false;
        return true;
    };

    const filteredIncomes = incomes.filter(inc =>
        (filterCategory === 'All' || inc.category === filterCategory) && filterByDate(inc)
    );

    return (
        <div className="tab-content">
            {/* Income Form */}
            <div className="expense-form-container">
                <h2>➕ Add New Income</h2>
                <form onSubmit={handleSubmit} className="expense-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                type="text"
                                className="premium-input"
                                placeholder="e.g., Monthly Salary"
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
                                onChange={(e) => setFormData({ ...formData, category: e.target.value as IncomeCategory })}
                            >
                                {['Salary', 'Freelance', 'Business', 'Investment Returns', 'Rental Income', 'Bonus', 'Gift', 'Refund', 'Other'].map((cat) => (
                                    <option key={cat} value={cat}>{getCategoryIcon(cat)} {cat}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Source</label>
                            <select
                                className="premium-select"
                                value={formData.source}
                                onChange={(e) => setFormData({ ...formData, source: e.target.value as IncomeSource })}
                            >
                                {['Primary Job', 'Side Hustle', 'Business', 'Investment', 'Gift', 'Other'].map((src) => (
                                    <option key={src} value={src}>{src}</option>
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
                            <span>Recurring Income</span>
                        </label>
                    </div>
                    <button type="submit" className="btn-submit">💾 LOG INCOME</button>
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
                        {['Salary', 'Freelance', 'Business', 'Investment Returns', 'Rental Income', 'Bonus', 'Gift', 'Refund', 'Other'].map((cat) => (
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

            {/* Income List */}
            <div className="expenses-list">
                <h2>📋 Recent Income</h2>
                {filteredIncomes.length === 0 ? (
                    <div className="empty-state">
                        <p>No income records found.</p>
                    </div>
                ) : (
                    <div className="expenses-grid">
                        {filteredIncomes.map((income) => (
                            <div key={income._id} className="expense-card">
                                <div className="expense-header">
                                    <div className="expense-category-badge income-badge">
                                        <span className="category-icon">{getCategoryIcon(income.category)}</span>
                                        <span>{income.category}</span>
                                    </div>
                                    {income.isRecurring && <span className="recurring-badge">🔄 Recurring</span>}
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
                                    onClick={() => {
                                        setDeletingId(income._id);
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
                    <p>Are you sure you want to delete this income record? This action cannot be undone.</p>
                    <div className="modal-actions">
                        <button className="btn-cancel" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                        <button className="btn-delete" onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default IncomeTab;
