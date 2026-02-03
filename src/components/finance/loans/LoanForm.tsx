import React, { useState, type FormEvent } from 'react';
import toast from 'react-hot-toast';
import { createLoan } from '../../../api/loans';
import type { LoanFormData } from '../../../types/loans';

interface LoanFormProps {
    onSuccess: () => void;
}

const LoanForm: React.FC<LoanFormProps> = ({ onSuccess }) => {
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
            onSuccess();
        } catch (err) {
            toast.error('Failed to create loan record');
        }
    };

    return (
        <div className="expense-form-container">
            <h2>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '12px', verticalAlign: 'middle' }}>
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                Record New Loan
            </h2>
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
    );
};

export default React.memo(LoanForm);
