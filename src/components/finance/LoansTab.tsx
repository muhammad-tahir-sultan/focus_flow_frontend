import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { deleteLoan, addPayment } from '../../api/loans';
import type { Loan } from '../../types/loans';

import LoanStats from './loans/LoanStats';
import LoanForm from './loans/LoanForm';
import LoanList from './loans/LoanList';
import PaymentModal from './loans/PaymentModal';
import DeleteLoanModal from './loans/DeleteLoanModal';

interface LoansTabProps {
    loans: Loan[];
    totalTook: number;
    totalGave: number;
    onRefresh: () => void;
}

const LoansTab: React.FC<LoansTabProps> = ({ loans, totalTook, totalGave, onRefresh }) => {
    // Modals State
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [payingLoanId, setPayingLoanId] = useState<string | null>(null);

    // Handlers
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

    const handlePayment = async (amountStr: string) => {
        if (!payingLoanId || !amountStr) return;
        try {
            await addPayment(payingLoanId, parseFloat(amountStr));
            toast.success('💰 Payment Added Successfully');
            setShowPaymentModal(false);
            setPayingLoanId(null);
            onRefresh();
        } catch (err) {
            toast.error('Failed to add payment');
        }
    };

    return (
        <div className="tab-content">
            {/* Loan Stats */}
            <LoanStats totalTook={totalTook} totalGave={totalGave} />

            {/* Loan Form */}
            <LoanForm onSuccess={onRefresh} />

            {/* Loans List */}
            <LoanList
                loans={loans}
                onAddPayment={(id) => {
                    setPayingLoanId(id);
                    setShowPaymentModal(true);
                }}
                onDelete={(id) => {
                    setDeletingId(id);
                    setShowDeleteModal(true);
                }}
            />

            {/* Payment Modal */}
            <PaymentModal
                show={showPaymentModal}
                onClose={() => setShowPaymentModal(false)}
                onConfirm={handlePayment}
            />

            {/* Delete Confirmation Modal */}
            <DeleteLoanModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default React.memo(LoansTab);

