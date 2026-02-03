import React, { useState } from 'react';
import type { FormEvent } from 'react';
import toast from 'react-hot-toast';
import { createIncome, deleteIncome } from '../../api/income';

import Modal from '../common/Modal';
import type { Income, IncomeFormData, IncomeCategory, IncomeSource } from '../../types/finance';


// Helper component for Income Icons
const IncomeIcon = ({ category }: { category: string }) => {
    switch (category) {
        case 'Salary': return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>;
        case 'Freelance': return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3.34"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M16 13H8"></path><path d="M16 17H8"></path><path d="M10 9H8"></path></svg>;
        case 'Business': return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"></path><path d="M5 21V7l8-4 8 4v14"></path><path d="M17 21v-8H7v8"></path></svg>;
        case 'Investment Returns': return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>;
        case 'Rental Income': return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
        case 'Bonus': return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>;
        case 'Gift': return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>;
        case 'Refund': return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"></polyline><polyline points="23 20 23 14 17 14"></polyline><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path></svg>;
        default: return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>;
    }
};

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
            toast.success('Income Logged Successfully');
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
            toast.success('Income Deleted');
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
                <h2>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '12px', verticalAlign: 'middle' }}>
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Add New Income
                </h2>
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
                                    <option key={cat} value={cat}>{cat}</option>
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
                    <button type="submit" className="btn-submit">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                            <polyline points="17 21 17 13 7 13 7 21"></polyline>
                            <polyline points="7 3 7 8 15 8"></polyline>
                        </svg>
                        LOG INCOME
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
                        {['Salary', 'Freelance', 'Business', 'Investment Returns', 'Rental Income', 'Bonus', 'Gift', 'Refund', 'Other'].map((cat) => (
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

            {/* Income List */}
            <div className="expenses-list">
                <h2>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '12px', verticalAlign: 'middle' }}>
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                    Recent Income
                </h2>
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
                                    onClick={() => {
                                        setDeletingId(income._id);
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

export default React.memo(IncomeTab);
