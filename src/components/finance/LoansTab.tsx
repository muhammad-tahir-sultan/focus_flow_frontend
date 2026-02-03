import React, { useState } from 'react';
import type { FormEvent } from 'react';
import toast from 'react-hot-toast';
import { createLoan, deleteLoan, addPayment } from '../../api/loans';
import Modal from '../common/Modal';
import type { Loan, LoanFormData } from '../../types/loans';

interface LoansTabProps {
    loans: Loan[];
    totalTook: number;
    totalGave: number;
    onRefresh: () => void;
}

const LoansTab: React.FC<LoansTabProps> = ({ loans, totalTook, totalGave, onRefresh }) => {
    // Form State
    const [formData, setFormData] = useState<LoanFormData>({
        title: '',
        amount: '',
        paidAmount: '0',
        type: 'Took',
        partyName: '',
        date: new Date().toISOString().split('T')[0],
        dueDate: '',
        interestRate: '0',
        description: '',
        tags: [],
    });

    // Modals State
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [payingLoanId, setPayingLoanId] = useState<string | null>(null);
    const [paymentAmount, setPaymentAmount] = useState('');

    // Handlers
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await createLoan(formData);
            toast.success('🤝 Loan Recorded Successfully');
            setFormData({
                title: '',
                amount: '',
                paidAmount: '0',
                type: 'Took',
                partyName: '',
                date: new Date().toISOString().split('T')[0],
                dueDate: '',
                interestRate: '0',
                description: '',
                tags: [],
            });
            onRefresh();
        } catch (err) {
            toast.error('Failed to create loan record');
        }
    };

    const handleDelete = async () => {
        if (!deletingId) return;
        try {
            await deleteLoan(deletingId);
            toast.success('🗑️ Loan Deleted');
            setShowDeleteModal(false);
            setDeletingId(null);
            onRefresh();
        } catch (err) {
            toast.error('Failed to delete loan');
        }
    };

    const handlePayment = async () => {
        if (!payingLoanId || !paymentAmount) return;
        try {
            await addPayment(payingLoanId, parseFloat(paymentAmount));
            toast.success('💰 Payment Added Successfully');
            setShowPaymentModal(false);
            setPaymentAmount('');
            setPayingLoanId(null);
            onRefresh();
        } catch (err) {
            toast.error('Failed to add payment');
        }
    };

    return (
        <div className="tab-content">
            {/* Loan Stats */}
            <div className="loan-stats-container">
                <div className="loan-stat-card took">
                    <div className="icon">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                            <polyline points="17 6 23 6 23 12"></polyline>
                        </svg>
                    </div>
                    <div className="content">
                        <h3>You Borrowed (Took)</h3>
                        <p>₹{totalTook.toLocaleString()}</p>
                    </div>
                </div>
                <div className="loan-stat-card gave">
                    <div className="icon">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
                            <polyline points="17 18 23 18 23 12"></polyline>
                        </svg>
                    </div>
                    <div className="content">
                        <h3>You Lent (Gave)</h3>
                        <p>₹{totalGave.toLocaleString()}</p>
                    </div>
                </div>
            </div>

            {/* Loan Form */}
            <div className="expense-form-container">
                <h2>🤝 Record New Loan</h2>
                <form onSubmit={handleSubmit} className="expense-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                type="text"
                                className="premium-input"
                                placeholder="e.g., Car Loan, Lent to Friend"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Amount (₹)</label>
                            <input
                                type="number"
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
                            <label>Loan Type</label>
                            <div className="type-toggles">
                                <button
                                    type="button"
                                    className={`type-btn ${formData.type === 'Took' ? 'active took' : ''}`}
                                    onClick={() => setFormData({ ...formData, type: 'Took' })}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                                        <polyline points="17 6 23 6 23 12"></polyline>
                                    </svg>
                                    Borrow (Took)
                                </button>
                                <button
                                    type="button"
                                    className={`type-btn ${formData.type === 'Gave' ? 'active gave' : ''}`}
                                    onClick={() => setFormData({ ...formData, type: 'Gave' })}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
                                        <polyline points="17 18 23 18 23 12"></polyline>
                                    </svg>
                                    Lend (Gave)
                                </button>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Party Name</label>
                            <input
                                type="text"
                                className="premium-input"
                                placeholder={formData.type === 'Took' ? 'Lender Name' : 'Borrower Name'}
                                value={formData.partyName}
                                onChange={(e) => setFormData({ ...formData, partyName: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-row">
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
                        <div className="form-group">
                            <label>Due Date (Optional)</label>
                            <input
                                type="date"
                                className="premium-input"
                                value={formData.dueDate}
                                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Interest Rate (%)</label>
                            <input
                                type="number"
                                className="premium-input"
                                placeholder="0"
                                value={formData.interestRate}
                                onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
                            />
                        </div>
                    </div>
                    <button type="submit" className={`btn-submit ${formData.type === 'Took' ? 'btn-took' : 'btn-gave'}`}>
                        {formData.type === 'Took' ? (
                            <>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                                    <polyline points="17 6 23 6 23 12"></polyline>
                                </svg>
                                RECORD DEBT
                            </>
                        ) : (
                            <>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
                                    <polyline points="17 18 23 18 23 12"></polyline>
                                </svg>
                                RECORD ASSET
                            </>
                        )}
                    </button>
                </form>
            </div>

            {/* Loans List */}
            <div className="expenses-list">
                <h2>📋 Active Loans</h2>
                {loans.length === 0 ? (
                    <div className="empty-state">
                        <p>No active loans.</p>
                    </div>
                ) : (
                    <div className="expenses-grid">
                        {loans.map((loan) => {
                            const progress = (loan.paidAmount / loan.amount) * 100;
                            const isPaid = loan.status === 'Fully Paid';
                            return (
                                <div key={loan._id} className={`expense-card loan-card ${loan.type.toLowerCase()}`}>
                                    <div className="expense-header">
                                        <div className={`expense-category-badge ${loan.type === 'Took' ? 'badge-took' : 'badge-gave'}`}>
                                            <span className="category-icon">
                                                {loan.type === 'Took' ? (
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                                                        <polyline points="17 6 23 6 23 12"></polyline>
                                                    </svg>
                                                ) : (
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
                                                        <polyline points="17 18 23 18 23 12"></polyline>
                                                    </svg>
                                                )}
                                            </span>
                                            <span>{loan.type}</span>
                                        </div>
                                        <div className={`status-badge ${loan.status.toLowerCase().replace('_', '-')}`}>
                                            {loan.status.replace('_', ' ')}
                                        </div>
                                    </div>
                                    <h3 className="expense-title">{loan.title}</h3>
                                    <p className="party-name">
                                        {loan.type === 'Took' ? 'From: ' : 'To: '} {loan.partyName}
                                    </p>

                                    <div className="savings-amounts">
                                        <div className="amount-current">
                                            Paid: ₹{loan.paidAmount.toLocaleString()}
                                        </div>
                                        <div className="amount-target">
                                            Total: ₹{loan.amount.toLocaleString()}
                                        </div>
                                    </div>
                                    <div className="progress-bar-container">
                                        <div
                                            className="progress-bar-fill"
                                            style={{
                                                width: `${Math.min(progress, 100)}%`,
                                                backgroundColor: loan.type === 'Took' ? '#ef4444' : '#10b981'
                                            }}
                                        ></div>
                                    </div>

                                    <div className="card-actions">
                                        {!isPaid && (
                                            <button
                                                className="btn-contribute"
                                                onClick={() => {
                                                    setPayingLoanId(loan._id);
                                                    setShowPaymentModal(true);
                                                }}
                                            >
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                                                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                                                    <line x1="1" y1="10" x2="23" y2="10"></line>
                                                </svg>
                                                Add Payment
                                            </button>
                                        )}
                                        <button
                                            className="btn-delete-icon"
                                            onClick={() => {
                                                setDeletingId(loan._id);
                                                setShowDeleteModal(true);
                                            }}
                                            title="Delete Loan"
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

            {/* Payment Modal */}
            <Modal
                show={showPaymentModal}
                onClose={() => setShowPaymentModal(false)}
                title="Record Payment"
            >
                <div className="modal-content">
                    <div className="form-group">
                        <label>Payment Amount (₹)</label>
                        <input
                            type="number"
                            className="premium-input"
                            value={paymentAmount}
                            onChange={(e) => setPaymentAmount(e.target.value)}
                            placeholder="Enter amount"
                            autoFocus
                        />
                    </div>
                    <div className="modal-actions">
                        <button className="btn-cancel" onClick={() => setShowPaymentModal(false)}>Cancel</button>
                        <button className="btn-submit-modal" onClick={handlePayment}>Record Payment</button>
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
                    <p>Are you sure you want to delete this loan record? This action cannot be undone.</p>
                    <div className="modal-actions">
                        <button className="btn-cancel" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                        <button className="btn-delete" onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default React.memo(LoansTab);
