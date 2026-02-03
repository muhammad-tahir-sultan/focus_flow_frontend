import React from 'react';
import type { Saving } from '../../../types/finance';
import GoalIcon from './GoalIcon';

interface SavingsListProps {
    savings: Saving[];
    onContribute: (id: string) => void;
    onDelete: (id: string) => void;
}

const SavingsList: React.FC<SavingsListProps> = ({ savings, onContribute, onDelete }) => {
    return (
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
                                        onClick={() => onContribute(saving._id)}
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                                            <line x1="12" y1="5" x2="12" y2="19"></line>
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                        </svg>
                                        Add Funds
                                    </button>
                                    <button
                                        className="btn-delete-icon"
                                        onClick={() => onDelete(saving._id)}
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
    );
};

export default React.memo(SavingsList);
