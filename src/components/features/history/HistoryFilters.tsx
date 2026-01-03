import type { PeriodFilter, MoodFilter } from '../../../types/history';

interface HistoryFiltersProps {
    periodFilter: PeriodFilter;
    setPeriodFilter: (filter: PeriodFilter) => void;
    moodFilter: MoodFilter;
    setMoodFilter: (filter: MoodFilter) => void;
}

const HistoryFilters = ({ periodFilter, setPeriodFilter, moodFilter, setMoodFilter }: HistoryFiltersProps) => {
    return (
        <div className="filters-container">
            <div className="filter-group">
                <span className="filter-group-label">
                    <span className="filter-icon">📅</span> Time Period
                </span>
                <select
                    className="filter-dropdown"
                    value={periodFilter}
                    onChange={(e) => setPeriodFilter(e.target.value as PeriodFilter)}
                >
                    <option value="this-month">This Month</option>
                    <option value="last-month">Last Month</option>
                    <option value="last-3-months">Last 3 Months</option>
                </select>
            </div>

            <div className="divider-vr" />

            <div className="filter-group">
                <span className="filter-group-label">
                    <span className="filter-icon">⚡</span> Focus Level
                </span>
                <select
                    className="filter-dropdown"
                    value={moodFilter}
                    onChange={(e) => setMoodFilter(e.target.value as MoodFilter)}
                >
                    <option value="all">Every Mood</option>
                    <option value="high">High Focus</option>
                    <option value="neutral">Neutral</option>
                    <option value="good">Good Focus</option>
                    <option value="low">Low Focus</option>
                </select>
            </div>
        </div>
    );
};

export default HistoryFilters;
