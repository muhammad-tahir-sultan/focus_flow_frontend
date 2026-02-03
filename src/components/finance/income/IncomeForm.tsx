import React, { useState, type FormEvent } from 'react';
import toast from 'react-hot-toast';
import { createIncome } from '../../../api/income';
import type { IncomeFormData, IncomeCategory, IncomeSource } from '../../../types/finance';

interface IncomeFormProps {
    onSuccess: () => void;
}

const IncomeForm: React.FC<IncomeFormProps> = ({ onSuccess }) => {
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
            onSuccess();
        } catch (err) {
            toast.error('Failed to create income');
        }
    };

    return (
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
    );
};

export default React.memo(IncomeForm);
