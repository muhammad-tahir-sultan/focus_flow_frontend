import React from 'react';
import Modal from '../../common/Modal';
import CategoryIcon from './CategoryIcon';
import type { Expense } from '../../../types/expenses';

interface DeleteExpenseModalProps {
    show: boolean;
    onClose: () => void;
    onDelete: () => void;
    expense: Expense | null;
}

const DeleteExpenseModal: React.FC<DeleteExpenseModalProps> = ({ show, onClose, onDelete, expense }) => {
    return (
        <Modal
            show={show}
            onClose={onClose}
            title="⚠️ Confirm Deletion"
        >
            <div className="delete-modal-content">
                {expense && (
                    <>
                        <div className="delete-warning">
                            <div className="warning-icon">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                    <line x1="12" y1="9" x2="12" y2="13"></line>
                                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                                </svg>
                            </div>
                            <p className="warning-text">
                                You're about to permanently delete this expense. This action cannot be undone.
                            </p>
                        </div>

                        <div className="expense-preview">
                            <h4>Expense Details</h4>
                            <div className="preview-item">
                                <span className="preview-label">Title:</span>
                                <span className="preview-value">{expense.title}</span>
                            </div>
                            <div className="preview-item">
                                <span className="preview-label">Amount:</span>
                                <span className="preview-value amount">₹{expense.amount.toLocaleString()}</span>
                            </div>
                            <div className="preview-item">
                                <span className="preview-label">Category:</span>
                                <span className="preview-value" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <CategoryIcon category={expense.category} /> {expense.category}
                                </span>
                            </div>
                            <div className="preview-item">
                                <span className="preview-label">Date:</span>
                                <span className="preview-value">{new Date(expense.date).toLocaleDateString()}</span>
                            </div>
                        </div>

                        <div className="modal-actions">
                            <button className="btn-cancel-modal" onClick={onClose}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                                Cancel
                            </button>
                            <button className="btn-delete-modal" onClick={onDelete}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                    <line x1="10" y1="11" x2="10" y2="17"></line>
                                    <line x1="14" y1="11" x2="14" y2="17"></line>
                                </svg>
                                Delete Expense
                            </button>
                        </div>
                    </>
                )}
            </div>
        </Modal>
    );
};

export default React.memo(DeleteExpenseModal);
