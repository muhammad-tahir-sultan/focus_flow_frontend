import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { deleteExpense } from '../../api/expenses';
import type { Expense } from '../../types/expenses';

import ExpenseForm from './expenses/ExpenseForm';
import ExpenseFilters from './expenses/ExpenseFilters';
import ExpenseList from './expenses/ExpenseList';
import DeleteExpenseModal from './expenses/DeleteExpenseModal';

interface ExpensesTabProps {
    expenses: Expense[];
    onRefresh: () => void;
}

const ExpensesTab: React.FC<ExpensesTabProps> = ({ expenses, onRefresh }) => {
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
            await deleteExpense(deletingId);
            toast.success('🗑️ Expense Deleted');
            setShowDeleteModal(false);
            setDeletingId(null);
            onRefresh();
        } catch (err) {
            toast.error('Failed to delete expense');
        }
    };

    const filterByDate = (expense: Expense) => {
        if (!filterStartDate && !filterEndDate) return true;
        const expenseDate = new Date(expense.date);
        const startDate = filterStartDate ? new Date(filterStartDate) : null;
        const endDate = filterEndDate ? new Date(filterEndDate) : null;

        if (startDate && expenseDate < startDate) return false;
        if (endDate && expenseDate > endDate) return false;
        return true;
    };

    const filteredExpenses = expenses.filter(exp =>
        (filterCategory === 'All' || exp.category === filterCategory) && filterByDate(exp)
    );

    const expenseToDelete = expenses.find(e => e._id === deletingId) || null;

    return (
        <div className="tab-content">
            {/* Expense Form */}
            <ExpenseForm onSuccess={onRefresh} />

            {/* Filter */}
            <ExpenseFilters
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

            {/* Expenses List */}
            <ExpenseList
                expenses={filteredExpenses}
                onDelete={(id) => {
                    setDeletingId(id);
                    setShowDeleteModal(true);
                }}
            />

            {/* Delete Confirmation Modal */}
            <DeleteExpenseModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onDelete={handleDelete}
                expense={expenseToDelete}
            />
        </div>
    );
};

export default React.memo(ExpensesTab);
