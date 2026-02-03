import React, { useState, type FormEvent } from 'react';
import toast from 'react-hot-toast';
import { createSaving } from '../../../api/savings';
import type { SavingFormData, SavingGoalType } from '../../../types/finance';

interface SavingsFormProps {
    onSuccess: () => void;
}

const SavingsForm: React.FC<SavingsFormProps> = ({ onSuccess }) => {
    const [formData, setFormData] = useState<SavingFormData>({
        title: '',
        targetAmount: '',
        currentAmount: '0',
        goalType: 'Emergency Fund' as SavingGoalType,
        targetDate: '',
        description: '',
        monthlyContribution: '',
        tags: [],
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await createSaving(formData);
            toast.success('🎯 Saving Goal Created Successfully');
            setFormData({
                title: '',
                targetAmount: '',
                currentAmount: '0',
                goalType: 'Emergency Fund' as SavingGoalType,
                targetDate: '',
                description: '',
                monthlyContribution: '',
                tags: [],
            });
            onSuccess();
        } catch (err) {
            toast.error('Failed to create saving goal');
        }
    };

    return (
        <div className="expense-form-container">
            <h2>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '12px', verticalAlign: 'middle' }}>
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Create Saving Goal
            </h2>
            <form onSubmit={handleSubmit} className="expense-form">
                <div className="form-row">
                    <div className="form-group">
                        <label>Goal Title</label>
                        <input
                            type="text"
                            className="premium-input"
                            placeholder="e.g., New Car"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Goal Type</label>
                        <select
                            className="premium-select"
                            value={formData.goalType}
                            onChange={(e) => setFormData({ ...formData, goalType: e.target.value as SavingGoalType })}
                        >
                            {['Emergency Fund', 'Retirement', 'Investment', 'Education', 'House/Property', 'Vehicle', 'Vacation', 'Wedding', 'Business', 'Other'].map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>Target Amount (₹)</label>
                        <input
                            type="number"
                            className="premium-input"
                            placeholder="0.00"
                            value={formData.targetAmount}
                            onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Current Savings (₹)</label>
                        <input
                            type="number"
                            className="premium-input"
                            placeholder="0.00"
                            value={formData.currentAmount}
                            onChange={(e) => setFormData({ ...formData, currentAmount: e.target.value })}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>Target Date</label>
                        <input
                            type="date"
                            className="premium-input"
                            value={formData.targetDate}
                            onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Monthly Contribution (Optional)</label>
                        <input
                            type="number"
                            className="premium-input"
                            placeholder="0.00"
                            value={formData.monthlyContribution}
                            onChange={(e) => setFormData({ ...formData, monthlyContribution: e.target.value })}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        className="premium-input"
                        placeholder="Why are you saving for this?"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={2}
                    />
                </div>
                <button type="submit" className="btn-submit">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                        <circle cx="12" cy="12" r="10"></circle>
                        <circle cx="12" cy="12" r="6"></circle>
                        <circle cx="12" cy="12" r="2"></circle>
                    </svg>
                    SET GOAL
                </button>
            </form>
        </div>
    );
};

export default React.memo(SavingsForm);
