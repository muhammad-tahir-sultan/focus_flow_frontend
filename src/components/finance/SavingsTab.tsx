import React, { useState, type FormEvent } from 'react';
import toast from 'react-hot-toast';
import { createSaving, deleteSaving, addContribution } from '../../api/savings';
import { getGoalIcon } from '../../utils/financeHelpers';
import Modal from '../common/Modal';
import type { Saving, SavingFormData, SavingGoalType } from '../../types/finance';

interface SavingsTabProps {
    savings: Saving[];
    onRefresh: () => void;
}

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
                <h2>➕ Create Saving Goal</h2>
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
                                    <option key={type} value={type}>{getGoalIcon(type)} {type}</option>
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
                    <button type="submit" className="btn-submit">🎯 SET GOAL</button>
                </form>
            </div>

            {/* Savings List */}
            <div className="expenses-list">
                <h2>🎯 Active Saving Goals</h2>
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
                                            <span className="category-icon">{getGoalIcon(saving.goalType)}</span>
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
                                            ➕ Add Funds
                                        </button>
                                        <button
                                            className="btn-delete-icon"
                                            onClick={() => {
                                                setDeletingId(saving._id);
                                                setShowDeleteModal(true);
                                            }}
                                            title="Delete Goal"
                                        >
                                            🗑️
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
