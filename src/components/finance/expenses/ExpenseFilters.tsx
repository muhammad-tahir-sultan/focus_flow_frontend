import React from 'react';

interface ExpenseFiltersProps {
    category: string;
    startDate: string;
    endDate: string;
    onCategoryChange: (val: string) => void;
    onStartDateChange: (val: string) => void;
    onEndDateChange: (val: string) => void;
    onClearDates: () => void;
}

const ExpenseFilters: React.FC<ExpenseFiltersProps> = ({
    category,
    startDate,
    endDate,
    onCategoryChange,
    onStartDateChange,
    onEndDateChange,
    onClearDates
}) => {
    return (
        <div className="filter-section">
            <div className="filter-group">
                <label>Filter by Category:</label>
                <select
                    className="premium-select filter-select"
                    value={category}
                    onChange={(e) => onCategoryChange(e.target.value)}
                >
                    <option value="All">All Categories</option>
                    {['Food & Dining', 'Transportation', 'Utilities', 'Entertainment', 'Healthcare', 'Education', 'Shopping', 'Housing', 'Investment', 'Other'].map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>
            <div className="filter-group">
                <label>From Date:</label>
                <input
                    type="date"
                    className="premium-input filter-date"
                    value={startDate}
                    onChange={(e) => onStartDateChange(e.target.value)}
                />
            </div>
            <div className="filter-group">
                <label>To Date:</label>
                <input
                    type="date"
                    className="premium-input filter-date"
                    value={endDate}
                    onChange={(e) => onEndDateChange(e.target.value)}
                />
            </div>
            {(startDate || endDate) && (
                <button
                    className="btn-clear-filter"
                    onClick={onClearDates}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                    Clear Dates
                </button>
            )}
        </div>
    );
};

export default React.memo(ExpenseFilters);
