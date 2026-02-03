import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { deleteIncome } from '../../api/income';
import type { Income } from '../../types/finance';

import IncomeForm from './income/IncomeForm';
import IncomeFilters from './income/IncomeFilters';
import IncomeList from './income/IncomeList';
import DeleteIncomeModal from './income/DeleteIncomeModal';

interface IncomeTabProps {
    incomes: Income[];
    onRefresh: () => void;
}

const IncomeTab: React.FC<IncomeTabProps> = ({ incomes, onRefresh }) => {
    // Filter State
    const [filterCategory, setFilterCategory] = useState<string>('All');
    const [filterStartDate, setFilterStartDate] = useState<string>('');
    const [filterEndDate, setFilterEndDate] = useState<string>('');

    // Delete Modal State
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    // Handlers
    const handleDelete = async () => {
        if (!deletingId) return;
        try {
            await deleteIncome(deletingId);
            toast.success('Income Deleted');
            setShowDeleteModal(false);
            setDeletingId(null);
            onRefresh();
        } catch (err) {
            toast.error('Failed to delete income');
        }
    };

    const filterByDate = (income: Income) => {
        if (!filterStartDate && !filterEndDate) return true;
        const incomeDate = new Date(income.date);
        const startDate = filterStartDate ? new Date(filterStartDate) : null;
        const endDate = filterEndDate ? new Date(filterEndDate) : null;

        if (startDate && incomeDate < startDate) return false;
        if (endDate && incomeDate > endDate) return false;
        return true;
    };

    const filteredIncomes = incomes.filter(inc =>
        (filterCategory === 'All' || inc.category === filterCategory) && filterByDate(inc)
    );

    return (
        <div className="tab-content">
            {/* Income Form */}
            <IncomeForm onSuccess={onRefresh} />

            {/* Filter */}
            <IncomeFilters
                category={filterCategory}
                startDate={filterStartDate}
                endDate={filterEndDate}
                onCategoryChange={setFilterCategory}
                onStartDateChange={setFilterStartDate}
                onEndDateChange={setFilterEndDate}
                onClearDates={() => {
                    setFilterStartDate('');
                    setFilterEndDate('');
                }}
            />

            {/* Income List */}
            <IncomeList
                incomes={filteredIncomes}
                onDelete={(id) => {
                    setDeletingId(id);
                    setShowDeleteModal(true);
                }}
            />

            {/* Delete Confirmation Modal */}
            <DeleteIncomeModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default React.memo(IncomeTab);

