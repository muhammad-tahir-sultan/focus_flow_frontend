import React, { useState, type FormEvent } from 'react';
import toast from 'react-hot-toast';
import { createSaving, deleteSaving, addContribution } from '../../api/savings';

import Modal from '../common/Modal';
import type { Saving, SavingFormData, SavingGoalType } from '../../types/finance';

interface SavingsTabProps {
    savings: Saving[];
    onRefresh: () => void;
}


// Helper component for Goal Icons
const GoalIcon = ({ type }: { type: string }) => {
    switch (type) {
        case 'Emergency Fund': return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>;
        case 'Retirement': return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>;
        case 'Investment': return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>;
        case 'Education': return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>;
        case 'House/Property': return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
        case 'Vehicle': return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>;
        case 'Vacation': return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
        case 'Wedding': return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>;
        case 'Business': return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>;
        default: return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v4l3 3"></path></svg>;
    }
};

const SavingsTab: React.FC<SavingsTabProps> = ({ savings, onRefresh }) => {
    // Form State
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

    // Modal States
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const [showContributeModal, setShowContributeModal] = useState(false);
    const [contributingId, setContributingId] = useState<string | null>(null);
    const [contributionAmount, setContributionAmount] = useState('');

    // Handlers
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
            onRefresh();
        } catch (err) {
            toast.error('Failed to create saving goal');
        }
    };

    const handleDelete = async () => {
        if (!deletingId) return;
        try {
            await deleteSaving(deletingId);
            toast.success('🗑️ Saving Goal Deleted');
            setShowDeleteModal(false);
            setDeletingId(null);
            onRefresh();
        } catch (err) {
            toast.error('Failed to delete saving goal');
        }
    };

    const handleContribution = async () => {
        if (!contributingId || !contributionAmount) return;
        try {
            await addContribution(contributingId, parseFloat(contributionAmount));
            toast.success('💰 Contribution Added Successfully');
            setShowContributeModal(false);
            setContributionAmount('');
            setContributingId(null);
            onRefresh();
        } catch (err) {
            toast.error('Failed to add contribution');
        }
    };

    return (
        <div className="tab-content">
            {/* Savings Form */}
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

            {/* Savings List */}
            <div className="expenses-list">
                <h2>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '12px', verticalAlign: 'middle' }}>
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                    Active Saving Goals
                </h2>
                {savings.length === 0 ? (
                    <div className="empty-state">
                        <p>No saving goals set. Start planning for your future!</p>
                    </div>
                ) : (
                    <div className="expenses-grid">
                        {savings.map((saving) => {
                            const progress = (saving.currentAmount / saving.targetAmount) * 100;
                            return (
                                <div key={saving._id} className="expense-card saving-card">
                                    <div className="expense-header">
                                        <div className="expense-category-badge savings-badge">
                                            <span className="category-icon"><GoalIcon type={saving.goalType} /></span>
                                            <span>{saving.goalType}</span>
                                        </div>
                                        <div className="savings-progress-text">{progress.toFixed(1)}%</div>
                                    </div>
                                    <h3 className="expense-title">{saving.title}</h3>
                                    <div className="savings-amounts">
                                        <div className="amount-current">₹{saving.currentAmount.toLocaleString()}</div>
                                        <div className="amount-target">Goal: ₹{saving.targetAmount.toLocaleString()}</div>
                                    </div>
                                    <div className="progress-bar-container">
                                        <div
                                            className="progress-bar-fill"
                                            style={{ width: `${Math.min(progress, 100)}%` }}
                                        ></div>
                                    </div>
                                    <div className="savings-dates">
                                        <span>Target: {new Date(saving.targetDate).toLocaleDateString()}</span>
                                    </div>
                                    <div className="card-actions">
                                        <button
                                            className="btn-contribute"
                                            onClick={() => {
                                                setContributingId(saving._id);
                                                setShowContributeModal(true);
                                            }}
                                        >
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                            </svg>
                                            Add Funds
                                        </button>
                                        <button
                                            className="btn-delete-icon"
                                            onClick={() => {
                                                setDeletingId(saving._id);
                                                setShowDeleteModal(true);
                                            }}
                                            title="Delete Goal"
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

            {/* Contribution Modal */}
            <Modal
                show={showContributeModal}
                onClose={() => setShowContributeModal(false)}
                title="Add Contribution"
            >
                <div className="modal-content">
                    <div className="form-group">
                        <label>Amount to Add (₹)</label>
                        <input
                            type="number"
                            className="premium-input"
                            value={contributionAmount}
                            onChange={(e) => setContributionAmount(e.target.value)}
                            placeholder="Enter amount"
                            autoFocus
                        />
                    </div>
                    <div className="modal-actions">
                        <button className="btn-cancel" onClick={() => setShowContributeModal(false)}>Cancel</button>
                        <button className="btn-submit-modal" onClick={handleContribution}>Add Funds</button>
                    </div>
                </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                title="Confirm Deletion"
            >
                <div className="modal-content">
                    <p>Are you sure you want to delete this saving goal? This action cannot be undone.</p>
                    <div className="modal-actions">
                        <button className="btn-cancel" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                        <button className="btn-delete" onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default React.memo(SavingsTab);
