import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { deleteSaving, addContribution } from '../../api/savings';
import type { Saving } from '../../types/finance';

import SavingsForm from './savings/SavingsForm';
import SavingsList from './savings/SavingsList';
import AddContributionModal from './savings/AddContributionModal';
import DeleteSavingModal from './savings/DeleteSavingModal';

interface SavingsTabProps {
    savings: Saving[];
    onRefresh: () => void;
}

const SavingsTab: React.FC<SavingsTabProps> = ({ savings, onRefresh }) => {
    // Modal States
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const [showContributeModal, setShowContributeModal] = useState(false);
    const [contributingId, setContributingId] = useState<string | null>(null);

    // Handlers
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

    const handleContribution = async (amountStr: string) => {
        if (!contributingId || !amountStr) return;
        try {
            await addContribution(contributingId, parseFloat(amountStr));
            toast.success('💰 Contribution Added Successfully');
            setShowContributeModal(false);
            setContributingId(null);
            onRefresh();
        } catch (err) {
            toast.error('Failed to add contribution');
        }
    };

    return (
        <div className="tab-content">
            {/* Savings Form */}
            <SavingsForm onSuccess={onRefresh} />

            {/* Savings List */}
            <SavingsList
                savings={savings}
                onContribute={(id) => {
                    setContributingId(id);
                    setShowContributeModal(true);
                }}
                onDelete={(id) => {
                    setDeletingId(id);
                    setShowDeleteModal(true);
                }}
            />

            {/* Contribution Modal */}
            <AddContributionModal
                show={showContributeModal}
                onClose={() => setShowContributeModal(false)}
                onConfirm={handleContribution}
            />

            {/* Delete Confirmation Modal */}
            <DeleteSavingModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default React.memo(SavingsTab);
