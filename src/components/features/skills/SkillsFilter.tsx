interface SkillsFilterProps {
    dateFilter: string;
    setDateFilter: (filter: string) => void;
    customStartDate: string;
    setCustomStartDate: (date: string) => void;
    customEndDate: string;
    setCustomEndDate: (date: string) => void;
}

const SkillsFilter = ({
    dateFilter,
    setDateFilter,
    customStartDate,
    setCustomStartDate,
    customEndDate,
    setCustomEndDate
}: SkillsFilterProps) => {

    const filters = [
        { label: 'Weekly', value: 'weekly' },
        { label: '2 Weeks', value: '2weeks' },
        { label: '1 Month', value: '1month' },
        { label: '3 Months', value: '3months' },
        { label: '6 Months', value: '6months' },
        { label: '1 Year', value: '1year' },
        { label: 'All Time', value: 'all' },
        { label: 'Custom', value: 'custom' },
    ];

    return (
        <div className="card mb-6" style={{ padding: '1rem' }}>
            <div className="flex-between mb-4" style={{ flexWrap: 'wrap', gap: '0.5rem' }}>
                {filters.map(filter => (
                    <button
                        key={filter.value}
                        onClick={() => setDateFilter(filter.value)}
                        className={`skill-badge ${dateFilter === filter.value ? 'badge-filled' : 'badge-outline'}`}
                        style={{ cursor: 'pointer' }}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>

            {dateFilter === 'custom' && (
                <div className="form-row-2">
                    <div>
                        <label className="text-sm mb-1 d-block">Start Date</label>
                        <input
                            type="date"
                            value={customStartDate}
                            onChange={(e) => setCustomStartDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-sm mb-1 d-block">End Date</label>
                        <input
                            type="date"
                            value={customEndDate}
                            onChange={(e) => setCustomEndDate(e.target.value)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default SkillsFilter;
